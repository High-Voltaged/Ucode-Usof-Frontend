import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthRequests from "~/requests/auth";
import { axiosClient } from "~/utils/axios-client";
import { getLocalStorageItem, updateLocalStorage } from "~/utils/local-storage";
import { decodeToken } from "~/utils/token";

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
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/autheticate",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = getLocalStorageItem("accessToken");
      if (accessToken) {
        const user = decodeToken(accessToken);

        const { data } = await axiosClient.get(`/users/${user.id}`);
        dispatch(initUser({ role: user.role, ...data }));
      }
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initUser(state, action) {
      const { id, role, email, login, avatar } = action.payload;
      state.user = { id, role, email, login, avatar };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, _action) => {
        state.error = "";
      })
      .addCase(login.fulfilled, (state, _action) => {
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authenticate.pending, (state, _action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(authenticate.fulfilled, (state, _action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer, actions } = authSlice;

export const { initUser } = actions;
export default reducer;
