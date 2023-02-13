import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { selectLeaderboardHasNext, selectLeaderboardInfo, selectLeaderboardIsLoading } from "../store";
import { leaderboardActions } from "../store/slices/leaderboard";
import { T_LeaderboardPayload } from "../types";

import { useAppDispatch } from "./storeHooks";

export const useLeaderboardSend = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => (payload: T_LeaderboardPayload) => {
      dispatch(() => leaderboardActions.sendResult(payload));
    },
    [],
  );
};

export const useLeaderboardResults = (page: number) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(() => leaderboardActions.getResults(page));
  }, [page]);
  const leaderboardResults = useSelector(selectLeaderboardInfo);
  return leaderboardResults;
};

export const useleaderboardIsLoading = () => {
  return useSelector(selectLeaderboardIsLoading);
};

export const useleaderboardHasNext = () => {
  return useSelector(selectLeaderboardHasNext);
};
