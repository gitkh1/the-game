import { bindWithDispatch } from "../../utils";
import { leaderboardSliceActions } from "../slices/leaderboard";
import { userSliceActions } from "../slices/user";

export const userActions = bindWithDispatch<typeof userSliceActions>(userSliceActions);
export const leaderboardActions = bindWithDispatch<typeof leaderboardSliceActions>(leaderboardSliceActions);
