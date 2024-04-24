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
import { FaSpinner } from "react-icons/fa6";

export default function Chats() {
  const [roomCredential, setroomCredential] = useState<messageRoomType[]>([]);
  const [status, setStatus] = useState("idle");
  console.log(status);

  const user = useUser();

  const handleGetCreateRoom = (roomsCredential: any) => {
    setroomCredential(roomsCredential);
  };
  useEffect(() => {
    socket.on("getCreateRoom", handleGetCreateRoom);
    getRoomsDB();
    return () => {
      socket.off("getCreateRoom", handleGetCreateRoom);
      getRoomsDB();
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
    setStatus("loading");
    try {
      const req = await axios({
        method: "get",
        url: `http://localhost:7000/room/${user.data.email}`,
      });
      // console.log(req.data);
      setroomCredential(req.data);
      setStatus("data");
    } catch (error) {
      setStatus("error");
    }
  }

  // useEffect(() => {
  //   getRoomsDB();
  //   return () => {
  //     getRoomsDB();
  //   };
  // });

  return (
    <div className="flex flex-col h-full space-y-4 p-2">
      {status === "loading" ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin h-8 w-8 text-center" />
        </div>
      ) : status === "error" ? (
        <span className="text-sm text-red-400">Something went wrong</span>
      ) : (
        <>
          {roomCredential.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
