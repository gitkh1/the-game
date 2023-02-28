import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { T_RootState } from "..";

interface I_Notification {
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  delay?: number;
}

interface I_State {
  notification?: I_Notification;
}

const initialState: I_State = {
  notification: undefined,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<I_Notification>) => {
      state.notification = { ...state?.notification, ...action.payload };
    },
    clearNotification: (state) => {
      state.notification = initialState.notification;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

export const notificationSelector = (state: T_RootState) => state.notification;
