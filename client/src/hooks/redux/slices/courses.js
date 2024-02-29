import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "setUpCourses",
  initialState: {
    initCourses: {},
    initCustomizedCourses: {},
  },
  reducers: {
    getCourses: (state, action) => {
      state.initCourses = {
        coursesData: action.payload,
      };
    },
    getCustomizedCourses: (state, action) => {
      state.initCustomizedCourses = {
        customizedCoursesData: action.payload,
      };
    },
  },
});
