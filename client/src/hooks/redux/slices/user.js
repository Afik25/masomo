import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "setUpUser",
  initialState: {
    initStudentDashboard: {},
  },
  reducers: {
    getStudentDashboard: (state, action) => {
      state.initStudentDashboard = {
        studentDashboardsData: action.payload,
      };
    },
  },
});
