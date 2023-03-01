import { createAsyncThunk } from "@reduxjs/toolkit";

import { I_AsyncThunkConfig, T_AppDispatch } from "../..";

import { forumApi } from "./api";
import { forumActions, I_Comment, I_Emoji, I_Message, I_Topic } from "./index";

const withFetchData = async (dispatch: T_AppDispatch, fn: () => Promise<void>) => {
  try {
    dispatch(forumActions.setIsLoading(true));
    await fn();
    dispatch(forumActions.setIsLoading(false));
  } catch (error) {
    if (error instanceof Error) dispatch(forumActions.setError(error.message));
    dispatch(forumActions.setIsLoading(false));
  }
};

export const getAllTopics = createAsyncThunk<void, void, I_AsyncThunkConfig>("forum/getAllTopics", async (_, { dispatch }) => {
  await withFetchData(dispatch, async () => {
    const data = await forumApi.getAllTopics<I_Topic[]>();
    dispatch(forumActions.setTopics(data));
  });
});

export const getCommentsByTopicId = createAsyncThunk<void, number, I_AsyncThunkConfig>(
  "forum/getCommentsByTopicId",
  async (payload, { dispatch }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.getComments<I_Comment[]>(payload);
      dispatch(forumActions.setComments(data));
    });
  },
);

export const getMessagesByCommentId = createAsyncThunk<void, number, I_AsyncThunkConfig>(
  "forum/getMessagesByCommentId",
  async (payload, { dispatch }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.getMessages<I_Message[]>(payload);
      dispatch(forumActions.setMessages(data));
    });
  },
);

export const createTopic = createAsyncThunk<void, Omit<I_Topic, "id">, I_AsyncThunkConfig>(
  "forum/createTopic",
  async (payload, { dispatch, getState }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.createTopic<I_Topic>(payload);
      const { topics } = getState().forum;
      dispatch(forumActions.setTopics([...topics, data]));
    });
  },
);

export const createComment = createAsyncThunk<void, Omit<I_Comment, "id">, I_AsyncThunkConfig>(
  "forum/createComment",
  async (payload, { dispatch, getState }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.createComment<I_Comment>(payload);
      const { comments } = getState().forum;
      dispatch(forumActions.setComments([...comments, data]));
    });
  },
);

export const createMessage = createAsyncThunk<void, Omit<I_Message, "id" | "emojis">, I_AsyncThunkConfig>(
  "forum/createMessage",
  async (payload, { dispatch, getState }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.createMessage<I_Message>(payload);
      const { messages } = getState().forum;
      dispatch(forumActions.setMessages([...messages, data]));
    });
  },
);

export const createEmoji = createAsyncThunk<void, Omit<I_Emoji, "id">, I_AsyncThunkConfig>(
  "forum/createEmoji",
  async (payload, { dispatch, getState }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.createEmoji<I_Message>(payload);
      const { messages } = getState().forum;
      dispatch(forumActions.setMessages(messages.map((message) => (message.id === data.id ? data : message))));
    });
  },
);

export const removeTopic = createAsyncThunk<void, number, I_AsyncThunkConfig>("forum/removeTopic", async (payload, { dispatch, getState }) => {
  await withFetchData(dispatch, async () => {
    await forumApi.removeTopic(payload);
    const { topics } = getState().forum;
    dispatch(forumActions.setTopics(topics.filter((topic) => topic.id !== payload)));
  });
});

export const removeComment = createAsyncThunk<void, number, I_AsyncThunkConfig>("forum/removeComment", async (payload, { dispatch, getState }) => {
  await withFetchData(dispatch, async () => {
    await forumApi.removeComment(payload);
    const { comments } = getState().forum;
    dispatch(forumActions.setComments(comments.filter((comment) => comment.id !== payload)));
  });
});

export const removeMessage = createAsyncThunk<void, number, I_AsyncThunkConfig>("forum/removeMessage", async (payload, { dispatch, getState }) => {
  await withFetchData(dispatch, async () => {
    await forumApi.removeMessage(payload);
    const { messages } = getState().forum;
    dispatch(forumActions.setMessages(messages.filter((message) => message.id !== payload)));
  });
});

export const removeEmoji = createAsyncThunk<void, Pick<I_Emoji, "id" | "messageId">, I_AsyncThunkConfig>(
  "forum/removeEmoji",
  async (payload, { dispatch, getState }) => {
    await withFetchData(dispatch, async () => {
      const data = await forumApi.removeEmoji<I_Message>(payload);
      const { messages } = getState().forum;
      dispatch(forumActions.setMessages(messages.map((message) => (message.id === data.id ? data : message))));
    });
  },
);
