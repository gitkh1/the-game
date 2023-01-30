import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "../../../api";
import { I_UserInfo } from "../../types";

interface I_State {
  data: I_UserInfo | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const initialState: I_State = {
  data: null,
  isLoading: false,
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<I_UserInfo>) => {
        state.data = { ...action.payload };
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<unknown>) => {
        console.log(action);
        if (action.payload instanceof Error) {
          state.isError = true;
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      });
  },
});

export const userSliceActions = {
  ...userSlice.actions,
  getUser,
};

export const userReducer = userSlice.reducer;
