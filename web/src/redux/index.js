import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth-slice";
import { postsApi, authApi, answersApi } from "~/redux/api";

const store = configureStore({
  reducer: combineReducers({
    auth,
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      authApi.middleware,
      answersApi.middleware
    ),
});

export default store;
