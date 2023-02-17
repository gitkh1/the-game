import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { leaderboardApi } from "../../../api";
import { LEADERBOARD_ROWS_LIMIT } from "../../../api/constants";
import type { T_LeaderboardPayload } from "../../types";

interface I_State {
  data: T_LeaderboardPayload[];
  isLoading: boolean;
  hasNext: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const initialState: I_State = {
  data: [],
  isLoading: false,
  hasNext: false,
  isError: false,
  errorMessage: null,
};

const getResults = createAsyncThunk("leaderboard/getResults", async (page: number, { rejectWithValue }) => {
  try {
    const data = await leaderboardApi.getResults(page, 1);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const sendResult = createAsyncThunk("leaderboard/sendResult", async (payload: T_LeaderboardPayload, { rejectWithValue }) => {
  try {
    return await leaderboardApi.sendResult(payload);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResults.fulfilled, (state, action: PayloadAction<T_LeaderboardPayload[]>) => {
        const rows = action.payload;
        state.hasNext = rows.length > LEADERBOARD_ROWS_LIMIT;
        state.data = rows.slice(0, LEADERBOARD_ROWS_LIMIT);
        state.isLoading = false;
      })
      .addCase(getResults.rejected, (state, action: PayloadAction<unknown>) => {
        if (action.payload instanceof Error) {
          state.isError = true;
          state.errorMessage = action.payload.message;
          state.data = [];
          state.isLoading = false;
          state.hasNext = false;
        }
      })
      .addCase(getResults.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.hasNext = false;
      });
  },
});

export const leaderboardActions = {
  ...leaderboardSlice.actions,
  getResults,
  sendResult,
};

export const leaderboardReducer = leaderboardSlice.reducer;
