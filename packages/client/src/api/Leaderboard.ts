import type { I_LeaderboardLeaderData, I_LeaderboardResultRequest, I_LeaderboardResultRow, T_LeaderboardPayload } from "../global/types";

import { Api } from "./Api";
import { ERROR_MESSAGE, LEADERBOARD_BASE_URL, LEADERBOARD_ROWS_LIMIT, TEAM_NAME } from "./constants";

const api = new Api(LEADERBOARD_BASE_URL);
// const api = new Api("https://ya-praktikum.tech/api/v2/leaderboard");

function getRequestFromPage(page: number, preloadNext: number): I_LeaderboardResultRequest {
  return {
    ratingFieldName: "score",
    cursor: page * LEADERBOARD_ROWS_LIMIT,
    limit: LEADERBOARD_ROWS_LIMIT + preloadNext,
  };
}

function getDataForPayload(payload: T_LeaderboardPayload): I_LeaderboardLeaderData {
  return {
    data: payload,
    ratingFieldName: "score",
    teamName: TEAM_NAME,
  };
}

export const leaderboardApi = {
  getResults: async (page: number, preloadNext = 0): Promise<T_LeaderboardPayload[]> => {
    try {
      const rows = await api.post<I_LeaderboardResultRow[]>(`/${TEAM_NAME}`, getRequestFromPage(page, preloadNext));
      return rows.map((e) => e.data);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
  sendResult: async (payload: T_LeaderboardPayload): Promise<string> => {
    try {
      return await api.post<string>("", getDataForPayload(payload));
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
};
