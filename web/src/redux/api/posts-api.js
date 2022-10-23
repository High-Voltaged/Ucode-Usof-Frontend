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
  reducerPath: "posts-api",
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: (
        { page, sort, filter } = { page: 1, sort: "likes", filter: {} }
      ) => ({
        url: `/posts`,
        params: { page, sort, ...filter },
      }),
      providesTags: ["Posts"],
    }),
    getPost: build.query({
      query: (postId) => `/posts/${postId}`,
    }),
    getPostCategories: build.query({
      query: (postId) => `/posts/${postId}/categories`,
    }),
    getPostLikes: build.query({
      query: (postId) => `/posts/${postId}/like`,
    }),
    createPost: build.mutation({
      query: (data) => ({
        url: `/posts`,
        method: "post",
        body: data,
      }),
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
      invalidatesTags: ["Posts"],
    }),
    getPostAnswers: build.query({
      query: (id) => `/posts/${id}/answers`,
    }),
    getComments: build.query({
      query: (id) => `/answers/${id}/comments`,
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
  useGetCommentsQuery,
  useAddPostLikeMutation,
  useGetCategoriesQuery,
  useCreatePostMutation,
} = api;
