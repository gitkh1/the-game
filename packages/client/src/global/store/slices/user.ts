import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "../../../api";
import type { I_UserInfo } from "../../types";

interface I_State {
  data: I_UserInfo | null;
  city: string;
  isLoaded: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const initialState: I_State = {
  data: null,
  city: "",
  isLoaded: false,
  isError: false,
  errorMessage: null,
};

const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
  try {
    const data = await authApi.getUser();
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<I_UserInfo>) => {
        state.data = { ...action.payload };
        state.isLoaded = true;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<unknown>) => {
        if (action.payload instanceof Error) {
          state.isError = true;
          state.errorMessage = action.payload.message;
          state.data = null;
          state.isLoaded = true;
        }
      })
      .addCase(getUser.pending, (state) => {
        state.isError = false;
        state.errorMessage = null;
      });
  },
});

export const userActions = {
  ...userSlice.actions,
  getUser,
};

export const userReducer = userSlice.reducer;
