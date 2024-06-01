import { createSlice } from "@reduxjs/toolkit";

export const challengeSlice = createSlice({
  name: "setUpChallenge",
  initialState: {
    initQuizByUser: {},
  },
  reducers: {
    getQuizByUser: (state, action) => {
      state.initQuizByUser = {
        quizByUserData: action.payload,
      };
    },
  },
});
