import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth-slice";
import { postsApi, authApi } from "~/redux/api";

const store = configureStore({
  reducer: combineReducers({
    auth,
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, authApi.middleware),
});

export default store;
