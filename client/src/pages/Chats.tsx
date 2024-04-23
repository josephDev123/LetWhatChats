import { socket } from "../socketIo";
import MessageRoomCard from "./Home/components/MessageRoomCard";
import { useSelector, useDispatch } from "react-redux";
import { chatAppType } from "../sliceType";
import { addRoomData } from "../slice";
import { ChatDataType } from "../type/chatDataType";
import { useEffect, useState } from "react";
import { messageRoomType } from "../type/messageRoomType";
import axios from "axios";
import { useUser } from "../customHooks/useUser";

export default function Chats() {
  const dispatch = useDispatch();
  const [roomCredential, setroomCredential] = useState<messageRoomType[]>([]);
  const [status, setStatus] = useState("idle");

  const user = useUser();

  // const rooms = useSelector((state: chatAppType) => state.roomCredential);

  useEffect(() => {
    const handleGetCreateRoom = (roomsCredential: any) => {
      setroomCredential(roomsCredential);
    };
    socket.on("getCreateRoom", handleGetCreateRoom);

    return () => {
      socket.off("getCreateRoom", handleGetCreateRoom);
    };
  }, []);
  // const handleGetCreateRoom = (roomsCredential: any) => {
  //   setroomCredential(roomsCredential);
  // };

  // if (socket) {
  //   socket.on("getCreateRoom", handleGetCreateRoom);
  // }

  // if (socket) {
  //   socket.off("getCreateRoom", handleGetCreateRoom);
  // }

  async function getRoomsDB() {
    try {
      const req = await axios({
        method: "get",
        url: `http://localhost:7000/room/${user.data.email}`,
      });
      // console.log(req.data);
      setroomCredential(req.data);
    } catch (error) {
      setStatus("error");
    }
  }

  useEffect(() => {
    getRoomsDB();
    return () => {
      getRoomsDB();
    };
  });

  return (
    <div className="flex flex-col h-full space-y-4 p-2">
      {roomCredential.map((item, index) => (
        <MessageRoomCard key={index} item={item} />
      ))}
    </div>
  );
}
