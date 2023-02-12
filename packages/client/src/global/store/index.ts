import { configureStore, PreloadedState } from "@reduxjs/toolkit";

import { userSlice } from "./user";

export type T_CreateStore = typeof createStore;
export type T_Store = ReturnType<T_CreateStore>;
export type T_RootState = ReturnType<T_Store["getState"]>;
export type T_AppDispatch = T_Store["dispatch"];

export function createStore(preloadedState?: PreloadedState<typeof userSlice.reducer>) {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    devTools: true,
    preloadedState,
  });
}
