// import { socket } from "../socketIo";
import MessageRoomCard from "./Home/components/MessageRoomCard";
import { useState } from "react";
import { messageRoomType } from "../type/messageRoomType";
import { useUser } from "../customHooks/useUser";
import { FaSpinner } from "react-icons/fa6";
import { useQueryFacade } from "../utils/GetConversationFacade";
import { useAppSelector } from "../lib/redux/hooks";
import { axiosDefault } from "../lib/axios/axiosInstance";
import { ConversationType } from "../type/dbConversationType";

export default function Chats() {
  const [roomCredential, setroomCredential] = useState<messageRoomType[]>([]);

  const user = useUser();
  console.log(user, roomCredential, setroomCredential);
  const signalReQuery = useAppSelector((state) => state.triggerQueryRefresh);

  // const handleGetCreateRoom = (roomsCredential: any) => {
  //   setroomCredential(roomsCredential);
  // };
  const conversations = useQueryFacade(
    ["conversations", signalReQuery.signal],
    async () => {
      const response = axiosDefault({
        method: "get",
        url: `conversation`,
      });
      return (await response).data.data;
    }
  );

  return (
    <div className="flex flex-col h-full space-y-4 p-2">
      {conversations.isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin h-8 w-8 text-center" />
        </div>
      ) : conversations.isError ? (
        <span className="text-sm text-red-400">Something went wrong</span>
      ) : (
        <>
          {conversations.data.map((item: ConversationType, index: number) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
