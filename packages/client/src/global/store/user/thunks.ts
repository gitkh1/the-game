import { createAsyncThunk } from "@reduxjs/toolkit";

import { userApi } from "./api";
import { I_PasswordPayload, I_ProfilePayload, I_User } from "./models";

export const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
  try {
    return await userApi.getUser<I_User>();
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (payload: I_ProfilePayload, { rejectWithValue }) => {
  try {
    return await userApi.changeProfile<I_User>(payload);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const updatePassword = createAsyncThunk("user/updatePassword", async (payload: I_PasswordPayload, { rejectWithValue }) => {
  try {
    return await userApi.changePassword<I_User>(payload);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const updateAvatar = createAsyncThunk("user/updateAvatar", async (payload: FormData, { rejectWithValue }) => {
  try {
    return await userApi.changePhoto<I_User>(payload);
  } catch (e) {
    return rejectWithValue(e);
  }
});
