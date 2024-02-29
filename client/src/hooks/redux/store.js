import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice } from "./slices/configuration";
import { programSlice } from "./slices/programs";
import { levelSlice } from "./slices/levels";
import { courseSlice } from "./slices/courses";

export const store = configureStore({
  reducer: {
    setInitConf: configurationSlice.reducer,
    setProgramSlice: programSlice.reducer,
    setLevelSlice: levelSlice.reducer,
    setCourseSlice: courseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
