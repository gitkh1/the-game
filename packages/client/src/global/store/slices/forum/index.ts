import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { T_RootState } from "../..";

import { I_Comment, I_Topic } from "./models";

interface I_InitialState {
  topics: I_Topic[];
  isLoading: boolean;
  errorMessage: string | null;
  selectedTopic: I_Topic | null;
  isOpenModal: boolean;
}

const initialState: I_InitialState = {
  topics: [],
  isLoading: false,
  errorMessage: null,
  selectedTopic: null,
  isOpenModal: false,
};

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    openModal: (state: I_InitialState) => {
      state.isOpenModal = true;
    },
    closeModal: (state: I_InitialState) => {
      state.isOpenModal = false;
    },
    selectTopic: (state: I_InitialState, action: PayloadAction<I_Topic>) => {
      state.selectedTopic = action.payload;
    },
    unselectTopic: (state: I_InitialState) => {
      state.selectedTopic = null;
    },
    addTopic: (state: I_InitialState, action: PayloadAction<I_Topic>) => {
      state.topics = [...state.topics, action.payload];
    },
  },
});

const forumActions = forumSlice.actions;
const forumReducer = forumSlice.reducer;
const forumSelector = (state: T_RootState) => state.forum;

export type { I_Comment, I_Topic };
export { forumActions, forumReducer, forumSelector };
