import { configureStore, createSelector, PreloadedState, StoreEnhancer } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";

import { forumReducer } from "./slices/forum";
import { leaderboardReducer } from "./slices/leaderboard";
import { notificationReducer } from "./slices/notification";
import { userReducer } from "./slices/user";

type T_Reducers = typeof userReducer & typeof leaderboardReducer;

export type T_CreateStore = typeof createStore;
export type T_Store = ReturnType<T_CreateStore>;
export type T_RootState = ReturnType<T_Store["getState"]>;
export type T_AppDispatch = T_Store["dispatch"];

export function createStore(preloadedState?: PreloadedState<T_Reducers>) {
  return configureStore({
    reducer: {
      user: userReducer,
      leaderboard: leaderboardReducer,
      forum: forumReducer,
      notification: notificationReducer,
    },
    devTools: true,
    preloadedState,
    enhancers: [Sentry.createReduxEnhancer() as StoreEnhancer],
  });
}

const selectUser = (state: T_RootState) => state.user;
export const selectUserInfo = createSelector(selectUser, (user) => user.data);
export const selectUserIsLoaded = createSelector(selectUser, (user) => user.isLoaded);

const selectLeaderboard = (state: T_RootState) => state.leaderboard;
export const selectLeaderboardInfo = createSelector(selectLeaderboard, (leaderboard) => leaderboard.data);
export const selectLeaderboardHasNext = createSelector(selectLeaderboard, (leaderboard) => leaderboard.hasNext);
export const selectLeaderboardIsLoading = createSelector(selectLeaderboard, (leaderboard) => leaderboard.isLoading);

export const selectUserCity = createSelector(selectUser, (user) => user.city);
