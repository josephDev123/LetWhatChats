import { combineReducers } from "@reduxjs/toolkit";
import triggerQueryRefresh from "./slices/triggerQueryRefresh";

export const rootReducer = combineReducers({
  triggerQueryRefresh,
});
