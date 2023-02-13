type T_MainFieldName = "score";

export type T_LeaderboardPayload = {
  [K in T_MainFieldName]: number;
} & {
  username: string;
  avatar: string | null;
};

export interface I_LeaderboardResultRequest {
  ratingFieldName: T_MainFieldName;
  cursor: number;
  limit: number;
}

export interface I_LeaderboardResultRow {
  data: T_LeaderboardPayload;
}

export interface I_LeaderboardLeaderData {
  data: T_LeaderboardPayload;
  ratingFieldName: T_MainFieldName;
  teamName: string;
}
