import { configureStore, createSelector } from "@reduxjs/toolkit";

import { leaderboardReducer } from "./slices/leaderboard";
import { userReducer } from "./slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
  devTools: true,
});

export const dispatch = store.dispatch;
export type T_RootState = ReturnType<typeof store.getState>;
export type T_AppDispatch = typeof store.dispatch;

const selectUser = (state: T_RootState) => state.user;
export const selectUserInfo = createSelector(selectUser, (user) => user.data);
export const selectUserIsLoaded = createSelector(selectUser, (user) => user.isLoaded);

const selectLeaderboard = (state: T_RootState) => state.leaderboard;
export const selectLeaderboardInfo = createSelector(selectLeaderboard, (leaderboard) => leaderboard.data);
export const selectLeaderboardHasNext = createSelector(selectLeaderboard, (leaderboard) => leaderboard.hasNext);
export const selectLeaderboardIsLoading = createSelector(selectLeaderboard, (leaderboard) => leaderboard.isLoading);
