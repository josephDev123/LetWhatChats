import { IoIosPeople } from "react-icons/io";
import { LuPlusCircle } from "react-icons/lu";
import { useQueryFacade } from "../utils/GetConversationFacade";
import { ConversationType } from "../type/dbConversationType";
import { FaRegPenToSquare, FaSpinner } from "react-icons/fa6";
import MessageRoomCard from "./Home/components/MessageRoomCard";

export default function Community() {
  const conversations = useQueryFacade<ConversationType[], Error>(
    ["conversations"],
    "conversation"
  );

  return (
    <section className="flex flex-col items-start p-2">
      <div className="flex items-center gap-4 relative cursor-pointer">
        <IoIosPeople className="text-3xl p-1 bg-black/20 rounded-md " />
        <p className="font-semibold">New community</p>
        <LuPlusCircle color="green" className="absolute left-5 top-4 " />
      </div>
      <div className="flex flex-col w-full mt-4">
        {conversations.isLoading && (
          <div className="h-full flex flex-col justify-center items-center">
            <FaSpinner className="animate-spin h-8 w-8" />
          </div>
        )}

        {conversations.isError && (
          <div className="">
            <span className="text-red-400">Something went wrong</span>
          </div>
        )}

        {conversations.data?.length == 0 && (
          <div>
            <p>No conversation. </p>
            <p className="inline-flex items-center gap-2">
              Click <FaRegPenToSquare className="text-green-400" /> above to
              create
            </p>
          </div>
        )}
        {conversations.data
          ?.filter((item) => item.conversation_name !== null)
          .map((item: ConversationType) => (
            <MessageRoomCard key={item._id} item={item} />
          ))}
      </div>
    </section>
  );
}
