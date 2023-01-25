import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export const dispatch = store.dispatch;
export type T_RootState = ReturnType<typeof store.getState>;
export type T_AppDispatch = typeof store.dispatch;
