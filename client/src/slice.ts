import { createSlice } from "@reduxjs/toolkit";
import { messageRoomType } from "./type/messageRoomType";
import { ChatDataType } from "./type/chatDataType";

export type chatOrgType = {
  roomCredential: messageRoomType[] | Object[];
  chatData: ChatDataType[] | Object[];
};

const initialState: chatOrgType = {
  roomCredential: [
    // {
    //   avatar: "",
    //   roomUniqueName: "",
    //   name: "",
    //   content: "",
    //   time: "",
    // },
  ],

  chatData: [
    // { name: "", room: "", chat: "", time: "" }
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addRoomData: (state, action) => {
      const payload = action.payload;
      state.roomCredential.push(payload);
    },
  },
});

export default chatSlice.reducer;
export const { addRoomData } = chatSlice.actions;
