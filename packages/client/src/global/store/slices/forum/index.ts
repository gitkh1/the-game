import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { T_RootState } from "../..";

import { I_Comment, I_Message, I_Topic } from "./models";

interface I_InitialState {
  topics: I_Topic[];
  isLoading: boolean;
  errorMessage: string | null;
  comments: I_Comment[];
  selectedTopic: I_Topic | null;
  selectedComment: I_Comment | null;
  messages: I_Message[];
}

const initialState: I_InitialState = {
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
    createTopic: (state: I_InitialState, action: PayloadAction<I_Topic>) => {
      state.topics = [...state.topics, action.payload];
    },
    selectTopic: (state: I_InitialState, action: PayloadAction<I_Topic>) => {
      state.selectedTopic = action.payload;
    },
    unselectTopic: (state: I_InitialState) => {
      state.selectedTopic = null;
    },
    selectComment: (state: I_InitialState, action: PayloadAction<I_Comment>) => {
      state.selectedComment = action.payload;
    },
    unselectComment: (state: I_InitialState) => {
      state.selectedComment = null;
    },
    createComment: (state: I_InitialState, action: PayloadAction<I_Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
    createMessage: (state: I_InitialState, action: PayloadAction<I_Message>) => {
      state.messages = [...state.messages, action.payload];
    },
    removeComment: (state: I_InitialState, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
    removeMessage: (state: I_InitialState, action: PayloadAction<number>) => {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    },
  },
});

const forumActions = forumSlice.actions;
const forumReducer = forumSlice.reducer;
const forumSelector = (state: T_RootState) => state.forum;
export type { I_Comment, I_Message, I_Topic };
export { forumActions, forumReducer, forumSelector };
