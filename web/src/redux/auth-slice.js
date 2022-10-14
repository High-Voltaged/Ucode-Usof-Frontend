import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthRequests from "~/requests/auth";
import { axiosClient } from "~/utils/axios-client";
import {
  getLocalStorageItem,
  removeFromLocalStorage,
  updateLocalStorage,
} from "~/utils/local-storage";
import { decodeToken } from "~/utils/token";
import { addReducerCases, rejectWithError } from "~/redux/utils";

const initialState = {
  user: {
    id: "",
    role: "",
    email: "",
    login: "",
    avatar: "",
  },
  loading: true,
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await AuthRequests.login(userData);
      updateLocalStorage("accessToken", data.accessToken);
      dispatch(authenticate());
    } catch (e) {
      return rejectWithError(rejectWithValue, e);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = getLocalStorageItem("accessToken");
      if (accessToken) {
        const user = decodeToken(accessToken);

        const { data } = await axiosClient.get(`/users/${user.id}`);
        dispatch(setUser({ role: user.role, ...data }));
      }
    } catch (e) {
      return rejectWithError(rejectWithValue, e);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await AuthRequests.logout();
      removeFromLocalStorage("accessToken");
      dispatch(setUser(initialState.user));
    } catch (e) {
      return rejectWithError(rejectWithValue, e);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, role, email, login, avatar } = action.payload;
      state.user = { id, role, email, login, avatar };
    },
  },
  extraReducers: (builder) => {
    addReducerCases(builder, login, false);
    addReducerCases(builder, authenticate);
    addReducerCases(builder, logout);
  },
});

const { reducer, actions } = authSlice;

export const { setUser } = actions;
export default reducer;
