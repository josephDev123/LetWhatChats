import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = string;
const initialState: initialStateType = "";
const TriggerRefresh = createSlice({
  name: "",
  initialState,
  reducers: {
    setTrigger: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
});

export const { setTrigger } = TriggerRefresh.actions;
export default TriggerRefresh.reducer;
