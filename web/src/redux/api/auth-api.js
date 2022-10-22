import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, resetUser, setToken, setUser } from "../auth-slice";

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
    credentials: "include",
  }),
  reducerPath: "auth-api",
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    authenticate: build.query({
      query: () => `/users/profile/me`,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
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
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          await dispatch(api.endpoints.authenticate.initiate(null));
        } catch (error) {}
      },
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
          await dispatch(api.endpoints.authenticate.initiate(null));
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
} = api;
