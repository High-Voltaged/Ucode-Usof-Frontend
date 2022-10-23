import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageItem,
  removeFromLocalStorage,
  updateLocalStorage,
} from "~/utils/local-storage";

const token = getLocalStorageItem("accessToken") || null;

const initialState = {
  user: {
    id: "",
    role: "",
    email: "",
    login: "",
    avatar: "",
  },
  token,
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
      updateLocalStorage("accessToken", payload.accessToken);
      state.token = payload.accessToken;
    },
    logout(state, _action) {
      removeFromLocalStorage("accessToken");
      state.token = null;
    },
  },
});

const { reducer, actions } = authSlice;

export const { resetUser, setUser, setToken, logout } = actions;
export default reducer;
