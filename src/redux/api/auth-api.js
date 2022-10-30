import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  logout,
  resetUser,
  setToken,
  setUser,
  updateUser,
} from "../auth-slice";

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
    credentials: "include",
  }),
  reducerPath: "auth-api",
  tagTypes: ["Auth", "MyPosts"],
  endpoints: (build) => ({
    getMyPosts: build.query({
      query: ({ page } = { page: 1 }) => ({
        url: `/users/profile/posts`,
        params: { page, limit: 6 },
      }),
      providesTags: ["MyPosts"],
    }),
    authenticate: build.query({
      query: () => `/users/profile/me`,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: ["Auth"],
    }),
    updateAvatar: build.mutation({
      query: ({ body }) => ({
        url: `/users/profile/avatar`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateProfile: build.mutation({
      query: ({ body }) => ({
        url: `/users/profile`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("authenticate", undefined, (draft) => {
            Object.assign(draft, body);
          })
        );
        dispatch(updateUser(body));
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    login: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(api.endpoints.authenticate.initiate());
        } catch (error) {}
      },
      invalidatesTags: ["Auth"],
    }),
    refresh: build.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          await dispatch(api.endpoints.authenticate.initiate());
        } catch (error) {}
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(resetUser());
        } catch (error) {}
      },
      invalidatesTags: ["MyPosts"],
    }),
    register: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `/auth/password-reset`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: ({ resetToken, ...data }) => ({
        url: `/auth/password-reset/${resetToken}`,
        method: "POST",
        body: data,
      }),
    }),
    confirmEmail: build.mutation({
      query: (confirmToken) => ({
        url: `/auth/confirm-email/${confirmToken}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyAuthenticateQuery,
  useLogoutMutation,
  useLoginMutation,
  useRefreshMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useConfirmEmailMutation,
  useGetMyPostsQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
} = api;
