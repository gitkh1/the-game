import { createAsyncThunk } from "@reduxjs/toolkit";

import { I_AsyncThunkConfig } from "../..";

import { forumApi } from "./api";
import { forumActions, I_Topic } from "./index";

export const getAllTopics = createAsyncThunk<void, void, I_AsyncThunkConfig>("forum/getAllTopics", async (_, { dispatch }) => {
  try {
    dispatch(forumActions.setIsLoading(true));
    const data = await forumApi.getAllTopics<I_Topic[]>();
    dispatch(forumActions.setTopics(data));
    dispatch(forumActions.setIsLoading(false));
  } catch (error) {
    if (error instanceof Error) dispatch(forumActions.setError(error.message));
    dispatch(forumActions.setIsLoading(false));
  }
});

export const createTopic = createAsyncThunk<void, Omit<I_Topic, "id">, I_AsyncThunkConfig>(
  "forum/createTopic",
  async (payload, { dispatch, getState }) => {
    try {
      dispatch(forumActions.setIsLoading(true));
      const data = await forumApi.createTopic<I_Topic>(payload);
      const { topics } = getState().forum;

      dispatch(forumActions.setTopics([...topics, data]));
      dispatch(forumActions.setIsLoading(false));
    } catch (error) {
      if (error instanceof Error) dispatch(forumActions.setError(error.message));
      dispatch(forumActions.setIsLoading(false));
    }
  },
);

export const removeTopic = createAsyncThunk<void, number, I_AsyncThunkConfig>("forum/removeTopic", async (payload, { dispatch, getState }) => {
  try {
    dispatch(forumActions.setIsLoading(true));
    await forumApi.removeTopic<I_Topic>(payload);
    const { topics } = getState().forum;
    dispatch(forumActions.setTopics(topics.filter((topic) => topic.id !== payload)));
    dispatch(forumActions.setIsLoading(false));
  } catch (error) {
    if (error instanceof Error) dispatch(forumActions.setError(error.message));
    dispatch(forumActions.setIsLoading(false));
  }
});
