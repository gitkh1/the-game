import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { T_RootState } from "../..";

import { I_Comment, I_Emoji, I_Message, I_Topic } from "./models";

export interface I_ForumState {
  topics: I_Topic[];
  isLoading: boolean;
  errorMessage: string | null;
  comments: I_Comment[];
  selectedTopic: I_Topic | null;
  selectedComment: I_Comment | null;
  messages: I_Message[];
}

const initialState: I_ForumState = {
  topics: [],
  isLoading: false,
  errorMessage: null,
  comments: [],
  messages: [],
  selectedTopic: null,
  selectedComment: null,
};

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    setIsLoading: (state: I_ForumState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state: I_ForumState, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setTopics: (state: I_ForumState, action: PayloadAction<I_Topic[]>) => {
      state.topics = action.payload;
    },
    setSelectedTopic: (state: I_ForumState, action: PayloadAction<I_Topic | null>) => {
      state.selectedTopic = action.payload;
    },
    setComments: (state: I_ForumState, action: PayloadAction<I_Comment[]>) => {
      state.comments = action.payload;
    },
    setSelectedComment: (state: I_ForumState, action: PayloadAction<I_Comment | null>) => {
      state.selectedComment = action.payload;
    },
    setMessages: (state: I_ForumState, action: PayloadAction<I_Message[]>) => {
      state.messages = action.payload;
    },
  },
});

const forumActions = forumSlice.actions;
const forumReducer = forumSlice.reducer;
const forumSelector = (state: T_RootState) => state.forum;
export type { I_Comment, I_Emoji, I_Message, I_Topic };
export { forumActions, forumReducer, forumSelector };
