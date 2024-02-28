import mongoose, { model, Schema, Types } from "mongoose";

export interface chatMsgType {
  name: string;
  room: string;
  chat: string;
  time: string;
}

const chatRoomSchema = new Schema<chatMsgType>({
  name: { type: String },
  room: { type: String },
  chat: { type: String },
  time: { type: String },
});

export const chatMsgModel = model("chatMsg", chatRoomSchema);
