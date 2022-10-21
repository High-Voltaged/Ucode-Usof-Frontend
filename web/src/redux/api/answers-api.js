import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cacheEntityRating, cacheNewLike } from "~/utils/likes";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "answers-api",
  tagTypes: ["Answers"],
  endpoints: (build) => ({
    getAnswerLikes: build.query({
      query: (answerId) => `/answers/${answerId}/like`,
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
          api.util.updateQueryData("getPostAnswers", postId, (draft) =>
            cacheEntityRating(draft, { ...patch, cachedType }, answerId)
          )
        );
        queryFulfilled.catch(patchResult1.undo);
        queryFulfilled.catch(patchResult2.undo);
      },
    }),
  }),
});

export const { useGetAnswerLikesQuery, useAddAnswerLikeMutation } = api;
