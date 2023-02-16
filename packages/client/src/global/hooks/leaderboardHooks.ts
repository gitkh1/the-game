import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { dispatch, selectLeaderboardHasNext, selectLeaderboardInfo, selectLeaderboardIsLoading } from "../store";
import { leaderboardActions } from "../store/actions";
import { T_LeaderboardPayload } from "../types";

export const useLeaderboardSend = () => {
  return useMemo(
    () => (payload: T_LeaderboardPayload) => {
      dispatch(() => leaderboardActions.sendResult(payload));
    },
    [],
  );
};

export const useLeaderboardResults = (page: number) => {
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
