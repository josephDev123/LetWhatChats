import mongoose, { model, Schema, Types } from "mongoose";

interface chatRoomType {
  name: string;
  room: string;
  chat: string;
  time: string;
}
const chatRoomSchema = new Schema<chatRoomType>({
  name: { type: String },
  room: { type: String },
  chat: { type: String },
  time: { type: String },
});

export const chatRoomModel = model("chatRoom", chatRoomSchema);
