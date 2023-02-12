import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { T_RootState } from "..";

import { I_User } from "./models";
import { getUser, updatePassword, updateProfile } from "./thunks";

export interface I_State {
  data: I_User | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: I_State = {
  data: null,
  isLoading: false,
  errorMessage: null,
};

const userDataHandler = (state: I_State, action: PayloadAction<I_User>) => {
  state.data = { ...action.payload };
  state.isLoading = false;
  state.errorMessage = null;
};

const isLoadingHandler = (state: I_State) => {
  state.isLoading = true;
  state.errorMessage = null;
};

const errorHandler = (state: I_State, action: PayloadAction<unknown>) => {
  if (action.payload instanceof Error) {
    state.errorMessage = action.payload.message;
  }
  state.isLoading = false;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDataHandler,
    isLoadingHandler,
    errorHandler,
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.rejected, errorHandler).addCase(getUser.fulfilled, userDataHandler).addCase(getUser.pending, isLoadingHandler);
    builder
      .addCase(updateProfile.rejected, errorHandler)
      .addCase(updateProfile.fulfilled, userDataHandler)
      .addCase(updateProfile.pending, isLoadingHandler);
    builder
      .addCase(updatePassword.rejected, errorHandler)
      .addCase(updatePassword.fulfilled, (state: I_State) => {
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(updatePassword.pending, isLoadingHandler);
  },
});

export const userSelector = (state: T_RootState) => state.user;
export const userSliceActions = userSlice.actions;
