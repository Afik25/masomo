import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice } from "./slices/configuration";
import { userSlice } from "./slices/user";
import { programSlice } from "./slices/programs";
import { levelSlice } from "./slices/levels";
import { courseSlice } from "./slices/courses";
import { lessonSlice } from "./slices/lessons";
import { exerciseSlice } from "./slices/exercises";
import { solutionSlice } from "./slices/solutions";
import { challengeSlice } from "./slices/challenge";

export const store = configureStore({
  reducer: {
    setInitConf: configurationSlice.reducer,
    setUserSlice: userSlice.reducer,
    setProgramSlice: programSlice.reducer,
    setLevelSlice: levelSlice.reducer,
    setCourseSlice: courseSlice.reducer,
    setLessonSlice: lessonSlice.reducer,
    setExerciseSlice: exerciseSlice.reducer,
    setSolutionSlice: solutionSlice.reducer,
    setChallengeSlice: challengeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
