import { socket } from "../socketIo";
import MessageRoomCard from "../components/home/MessageRoomCard";
import { useSelector, useDispatch } from "react-redux";
import { chatAppType } from "../sliceType";
import { addRoomData } from "../slice";

export default function Chats() {
  const dispatch = useDispatch();
  const rooms = useSelector((state: chatAppType) => state.roomCredential);
  if (socket) {
    socket.on("getCreateRoom", (roomsCredential) => {
      dispatch(addRoomData(roomsCredential));
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
