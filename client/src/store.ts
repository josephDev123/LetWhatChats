import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/slice";

export const store = configureStore({
  reducer: rootReducer,
});
