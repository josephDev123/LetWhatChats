import { model, Schema, Types } from "mongoose";

interface Room {
  userEmail: string;
  roomUniqueName: string;
  avatar: string;
  time: string;
}

const RoomSchema = new Schema<Room>({
  userEmail: String,
  roomUniqueName: String,
  avatar: String,
  time: String,
});

export const roomModel = model("Room", RoomSchema);
