import mongoose, { model, Schema, Types } from "mongoose";

interface chatRoomType {
  name: string;
  room: Types.ObjectId;
  chat: string;
  time: string;
}
const chatRoomSchema = new Schema<chatRoomType>({
  name: { type: String },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  chat: { type: String },
  time: { type: String },
});

export const chatRoomModel = model("chatRoom", chatRoomSchema);
