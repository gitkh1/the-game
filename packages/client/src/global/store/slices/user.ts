import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../../api';

export interface I_User {
  id?: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

interface T_State {
  user: I_User | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const initialState: T_State = {
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
};

const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.getUser();
    const fromJson = await response.json();
    return fromJson;
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
      .addCase(getUser.fulfilled, (state, action: PayloadAction<I_User>) => {
        state.user = { ...action.payload };
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<unknown>) => {
        console.log(action);
        if (action.payload instanceof Error) {
          state.isError = true;
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
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
