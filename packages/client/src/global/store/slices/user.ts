import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../../api';
import { I_UserInfo } from '../../types';

interface T_State {
  data: I_UserInfo | null;
  isLoaded: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const initialState: T_State = {
  data: null,
  isLoaded: false,
  isError: false,
  errorMessage: null,
};

const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const data = await authApi.getUser<I_UserInfo>();
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<I_UserInfo>) => {
        state.data = { ...action.payload };
        state.isLoaded = true;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<unknown>) => {
        console.log(action);
        if (action.payload instanceof Error) {
          state.isError = true;
          state.errorMessage = action.payload.message;
          state.data = null;
          state.isLoaded = true;
        }
      })
      .addCase(getUser.pending, (state) => {
        state.isError = false;
        state.errorMessage = null;
      });
  },
});

export const userSliceActions = {
  ...userSlice.actions,
  getUser,
};

export const userReducer = userSlice.reducer;
