import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageItem,
  removeFromLocalStorage,
  updateLocalStorage,
} from "~/utils/local-storage";
import { authApi } from "./api";

const accessToken = getLocalStorageItem("accessToken") || null;

const initialState = {
  user: {
    id: "",
    role: "user",
    fullName: "",
    email: "",
    login: "",
    avatar: "",
    rating: 0,
  },
  accessToken,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser(state, _action) {
      state.user = initialState.user;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
    updateUser(state, { payload }) {
      Object.assign(state.user, payload);
    },
    setToken(state, { payload }) {
      const { accessToken } = payload;
      updateLocalStorage("accessToken", accessToken);
      state.accessToken = accessToken;
    },
    logout(state, _action) {
      removeFromLocalStorage("accessToken");
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
      }
    );
  },
});

const { reducer, actions } = authSlice;

export const { resetUser, setUser, setToken, logout, updateUser } = actions;
export default reducer;
