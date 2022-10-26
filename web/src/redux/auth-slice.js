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
    role: "",
    email: "",
    login: "",
    avatar: "",
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
      const { id, role, email, login, avatar } = payload;
      state.user = { id, role, email, login, avatar };
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

export const { resetUser, setUser, setToken, logout } = actions;
export default reducer;
