import MessageRoomCard from "./Home/components/MessageRoomCard";
import { useEffect, useState } from "react";
import { useUser } from "../customHooks/useUser";
import { FaSpinner } from "react-icons/fa6";
import { useQueryFacade } from "../utils/GetConversationFacade";
import { useAppSelector } from "../lib/redux/hooks";
import { ConversationType } from "../type/dbConversationType";

export default function Chats() {
  const user = useUser();
  console.log(user);
  const signalReQuery = useAppSelector((state) => state.triggerQueryRefresh);
  const [queryKey, setQueryKey] = useState([signalReQuery.signal]);
  useEffect(() => {
    setQueryKey([signalReQuery.signal]);
  }, [signalReQuery.signal]);

  const conversations = useQueryFacade<ConversationType[], Error>(
    ["conversations", ...queryKey],
    "conversation"
  );

  return (
    <div className="flex flex-col h-full sm:space-y-4 space-y-2 p-2">
      {conversations.isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin h-8 w-8 text-center" />
        </div>
      ) : conversations.isError ? (
        <span className="text-sm text-red-400">Something went wrong</span>
      ) : (
        <>
          {conversations.data?.map((item: ConversationType, index: number) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
