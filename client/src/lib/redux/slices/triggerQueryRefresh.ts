import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  type: string;
  signal: string;
};
const initialState: initialStateType = {
  type: "",
  signal: "",
};
const TriggerQueryRefresh = createSlice({
  name: "triggerQuery",
  initialState,
  reducers: {
    setTrigger: (state, action: PayloadAction<initialStateType>) => {
      if (action.payload.type !== undefined) {
        state.type = action.payload.type;
      }
      if (action.payload.signal !== undefined) {
        state.signal = action.payload.signal;
      }
    },
  },
});

export const { setTrigger } = TriggerQueryRefresh.actions;
export default TriggerQueryRefresh.reducer;
