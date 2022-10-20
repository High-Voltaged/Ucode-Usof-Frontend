import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { api as authApi } from "./auth-api";
export { authApi };

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
      query: (page = 1) => `/posts?page=${page}`,
    }),
    getPost: build.query({
      query: (id) => `/posts/${id}`,
    }),
    getPostCategories: build.query({
      query: (postId) => `/posts/${postId}/categories`,
    }),
    getPostLikes: build.query({
      query: (postId) => `/posts/${postId}/like`,
    }),
    getPostAnswers: build.query({
      query: (id) => `/posts/${id}/answers`,
    }),
    getAnswerLikes: build.query({
      query: (answerId) => `/answers/${answerId}/like`,
    }),
    getComments: build.query({
      query: (id) => `/answers/${id}/comments`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostAnswersQuery,
  useGetPostCategoriesQuery,
  useGetPostLikesQuery,
  useGetAnswerLikesQuery,
  useGetCommentsQuery,
} = api;
