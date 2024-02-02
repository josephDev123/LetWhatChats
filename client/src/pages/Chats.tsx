import { messageRoomType } from "../type/messageRoomType";
import { useState } from "react";
import { socket } from "../socketIo";
import MessageRoomCard from "../components/home/MessageRoomCard";

export default function Chats() {
  const [rooms, setRooms] = useState<messageRoomType[]>([]);
  if (socket) {
    socket.on("getCreateRoom", (roomsCredential) => {
      setRooms([...rooms, roomsCredential]);
    });
  }
  return (
    <div className="flex flex-col h-full space-y-2">
      {rooms.map((item, index) => (
        <MessageRoomCard key={index} item={item} />
      ))}
    </div>
  );
}
