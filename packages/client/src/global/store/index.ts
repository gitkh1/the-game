import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./user";

export type T_Store = typeof store;
export type T_RootState = ReturnType<typeof store.getState>;
export type T_AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  devTools: true,
  preloadedState: {},
});
