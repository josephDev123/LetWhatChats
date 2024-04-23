import { socket } from "../socketIo";
import MessageRoomCard from "./Home/components/MessageRoomCard";
import { useSelector, useDispatch } from "react-redux";
import { chatAppType } from "../sliceType";
import { addRoomData } from "../slice";

export default function Chats() {
  const dispatch = useDispatch();

  const rooms = useSelector((state: chatAppType) => state.roomCredential);

  const handleGetCreateRoom = (roomsCredential: any) => {
    return dispatch(addRoomData(roomsCredential));
  };

  if (socket) {
    socket.on("getCreateRoom", handleGetCreateRoom);
  }

  if (socket) {
    socket.off("getCreateRoom", handleGetCreateRoom);
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      {rooms.map((item, index) => (
        <MessageRoomCard key={index} item={item} />
      ))}
    </div>
  );
}
