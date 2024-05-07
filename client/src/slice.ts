import { createSlice } from "@reduxjs/toolkit";
import { messageRoomType } from "./type/messageRoomType";
import { ChatDataType } from "./type/chatDataType";

export type chatOrgType = {
  roomCredential: messageRoomType | Object;
  chatData: ChatDataType[] | Object[];
  isVideoModalOpen: boolean;
};

const initialState: chatOrgType = {
  roomCredential: {},
  // {
  //   avatar: "",
  //   roomUniqueName: "",
  //   name: "",
  //   content: "",
  //   time: "",
  // },
  chatData: [
    // { name: "", room: "", chat: "", time: "" }
  ],
  isVideoModalOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addRoomData: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        roomCredential: payload,
      };
    },

    setVideoModalOpen: (state, action) => {
      const payload = action.payload;
      state.isVideoModalOpen = payload;
    },
  },
});

export default chatSlice.reducer;
export const { addRoomData, setVideoModalOpen } = chatSlice.actions;
