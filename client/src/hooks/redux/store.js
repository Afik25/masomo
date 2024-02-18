import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice } from "./slices/configuration";
import { programSlice } from "./slices/programs";
import { levelSlice } from "./slices/levels";

export const store = configureStore({
  reducer: {
    setInitConf: configurationSlice.reducer,
    setProgramSlice: programSlice.reducer,
    setLevelSlice: levelSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
