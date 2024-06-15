import { createSlice } from "@reduxjs/toolkit";

export const challengeSlice = createSlice({
  name: "setUpChallenge",
  initialState: {
    initTheme: {},
    initQuizByUser: {},
    initQuizCurrent: {},
    initQuizLeaderBoardById: {},
  },
  reducers: {
    getThemes: (state, action) => {
      state.initTheme = {
        themesData: action.payload,
      };
    },
    getQuizByUser: (state, action) => {
      state.initQuizByUser = {
        quizByUserData: action.payload,
      };
    },
    getQuizCurrent: (state, action) => {
      state.initQuizCurrent = {
        quizCurrentData: action.payload,
      };
    },
    getQuizLeaderBoardById: (state, action) => {
      state.initQuizLeaderBoardById = {
        quizLeaderBoardByIdData: action.payload,
      };
    },
  },
});
