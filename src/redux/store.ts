import { configureStore } from "@reduxjs/toolkit";
import { default as createFormReducer } from "./createFormSlice";

export const store = configureStore({
  reducer: {
    createForm: createFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
