import { configureStore } from "@reduxjs/toolkit";
import { default as formReducer } from "./formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
