import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cacheEntityRating, cacheNewLike } from "~/utils/likes";
import _ from "lodash";

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
  reducerPath: "posts-api",
  tagTypes: ["Posts", "Post", "PostAnswers", "PostCategories"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: (
        { page, sort, filter } = { page: 1, sort: "likes", filter: {} }
      ) => ({
        url: `/posts`,
        params: {
          page: _.isEmpty(filter) ? page : 1,
          sort,
          ...filter,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.posts.map(({ id }) => ({ type: "Posts", id })), "Posts"]
          : ["Posts"],
    }),
    getPost: build.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_r, _e, arg) => [{ type: "Post", id: arg }],
    }),
    getPostCategories: build.query({
      query: (postId) => `/posts/${postId}/categories`,
      providesTags: (_r, _e, arg) => [{ type: "PostCategories", id: arg }],
    }),
    getPostLikes: build.query({
      query: (postId) => `/posts/${postId}/like`,
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: `/posts`,
        method: "post",
        body,
      }),
    }),
    editPost: build.mutation({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(
        { id, body: { title, content } },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPost", id, (draft) => {
            Object.assign(draft, { title, content });
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: (_r, _e, arg) => [
        { type: "Posts", id: arg.id },
        { type: "PostCategories", id: arg.id },
      ],
    }),
    deletePost: build.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "Post", id: arg.id },
        { type: "Posts", id: arg.id },
        { type: "PostCategories", id: arg.id },
      ],
    }),
    createPostAnswer: build.mutation({
      query: ({ postId, body: { content } }) => ({
        url: `/posts/${postId}/answers`,
        method: "post",
        body: { content },
      }),
      invalidatesTags: ["PostAnswers"],
    }),
    addPostLike: build.mutation({
      query: ({ postId, type }) => ({
        url: `/posts/${postId}/like`,
        method: "post",
        body: { type },
      }),
      async onQueryStarted({ postId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult1 = dispatch(
          api.util.updateQueryData("getPostLikes", postId, (draft) =>
            cacheNewLike(draft, patch)
          )
        );
        const cachedType = patchResult1.inversePatches[0].value.type;

        const patchResult2 = dispatch(
          api.util.updateQueryData("getPost", postId, (draft) => {
            cacheEntityRating(draft, { ...patch, cachedType }, postId);
          })
        );
        queryFulfilled.catch(patchResult1.undo);
        queryFulfilled.catch(patchResult2.undo);
      },
      invalidatesTags: (_r, _e, arg) => [{ type: "Posts", id: arg.id }],
    }),
    getPostAnswers: build.query({
      query: (id) => `/posts/${id}/answers`,
      providesTags: ["PostAnswers"],
    }),
    getCategories: build.query({
      query: () => `/categories`,
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostAnswersQuery,
  useGetPostCategoriesQuery,
  useGetPostLikesQuery,
  useAddPostLikeMutation,
  useGetCategoriesQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useCreatePostAnswerMutation,
} = api;
