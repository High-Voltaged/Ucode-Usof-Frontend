import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cacheEntityRating, cacheNewLike } from "~/utils/likes";
import { postsApi } from "~/redux/api";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "answers-api",
  tagTypes: ["Answers", "Comments"],
  endpoints: (build) => ({
    getAnswerLikes: build.query({
      query: (answerId) => `/answers/${answerId}/like`,
    }),
    getComments: build.query({
      query: (answerId) => `/answers/${answerId}/comments`,
      providesTags: ["Comments"],
    }),
    addAnswerComment: build.mutation({
      query: ({ answerId, body: { content } }) => ({
        url: `/answers/${answerId}/comments`,
        method: "post",
        body: { content },
      }),
      // async onQueryStarted({ answerId, body }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     api.util.updateQueryData("getComments", answerId, (draft) => {
      //       draft.push(body);
      //     })
      //   );
      //   queryFulfilled.catch(patchResult.undo);
      // },
      invalidatesTags: ["Comments"],
    }),
    editComment: build.mutation({
      query: ({ commentId, body }) => ({
        url: `/comments/${commentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: build.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    addAnswerLike: build.mutation({
      query: ({ answerId, type }) => ({
        url: `/answers/${answerId}/like`,
        method: "post",
        body: { type },
      }),
      async onQueryStarted(
        { answerId, postId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        const patchResult1 = dispatch(
          api.util.updateQueryData("getAnswerLikes", answerId, (draft) =>
            cacheNewLike(draft, patch)
          )
        );
        const cachedType = patchResult1.inversePatches[0].value.type;
        const patchResult2 = dispatch(
          postsApi.util.updateQueryData("getPostAnswers", postId, (draft) =>
            cacheEntityRating(draft, { ...patch, cachedType }, answerId)
          )
        );
        queryFulfilled.catch(patchResult1.undo);
        queryFulfilled.catch(patchResult2.undo);
      },
    }),
  }),
});

export const {
  useGetAnswerLikesQuery,
  useGetCommentsQuery,
  useAddAnswerLikeMutation,
  useAddAnswerCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = api;
