import { I_LeaderboardLeaderData, I_LeaderboardResultRequest, I_LeaderboardResultRow, T_LeaderboardPayload } from "../global/types";

import { Api } from "./Api";
import { ERROR_MESSAGE, LEADERBOARD_BASE_URL, LEADERBOARD_ROWS_LIMIT, TEAM_NAME } from "./constants";

const api = new Api(LEADERBOARD_BASE_URL);

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
      const response = await api.post(`/${TEAM_NAME}`, getRequestFromPage(page, preloadNext));
      const rows = (await response.json()) as I_LeaderboardResultRow[];
      return rows.map((e) => e.data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
      throw err;
    }
  },
  sendResult: async <T>(payload: T_LeaderboardPayload): Promise<T | unknown> => {
    try {
      return api.post("", getDataForPayload(payload));
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
};
