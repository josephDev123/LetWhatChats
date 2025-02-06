import { Outlet, useSearchParams } from "react-router-dom";
import LeftPanelHeading from "./components/LeftPanelHeading";
import SearchChat from "./components/SearchChat";
import MessageRoomCard from "./components/MessageRoomCard";
import { Images } from "../../../Images";
import MobileTopTab from "../../generic/MobileTopTab";
import { FaRegPenToSquare, FaSpinner } from "react-icons/fa6";
import { useQueryFacade } from "../../utils/GetConversationFacade";
import { ConversationType } from "../../type/dbConversationType";
// import { useAppSelector } from "../../lib/redux/hooks";
import { useEffect, useState } from "react";

export default function HomeLayout({}: {}) {
  const [conversationsFiltered, setConversationsFiltered] = useState<
    ConversationType[]
  >([]);
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(setSearchParam);
  // const signalReQuery = useAppSelector((state) => state.triggerQueryRefresh);
  // const [queryKey, setQueryKey] = useState([signalReQuery.signal]);

  // useEffect(() => {
  //   setQueryKey([signalReQuery.signal]);
  // }, [signalReQuery.signal]);

  const conversations = useQueryFacade<ConversationType[], Error>(
    // ...queryKey
    ["conversations"],
    "conversation"
  );

  useEffect(() => {
    setConversationsFiltered(conversations.data || []);
  }, [conversations.data]);

  const listenToSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    if (value === "") {
      setConversationsFiltered(conversations.data || []);
      return;
    }

    const filtered =
      conversations.data?.filter((item) => {
        if (item.conversation_name) {
          return item.conversation_name.toLowerCase().includes(value);
        }
        return false;
      }) || [];

    if (filtered.length === 0) {
      setConversationsFiltered(conversations.data || []);
    } else {
      setConversationsFiltered(filtered);
    }
  };

  // console.log(conversations.data);
  return (
    <section className="flex w-full h-full gap-1">
      <div className="md:w-[30%] sm:w-[40%] w-full flex flex-col h-screen sm:p-2">
        <div className="sm:bg-transparent bg-[#075E55] p-2 sm:text-inherit text-white/75">
          <LeftPanelHeading />
          <SearchChat listenToSearch={listenToSearch} />
          <MobileTopTab />
        </div>

        {/* large screen left panel */}
        <div className="overflow-y-auto  sm:flex hidden flex-col mt-4 space-y-0.5 h-full">
          {/* <span>Connection status: {connectionStatus}</span> */}
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

          {conversationsFiltered.length == 0 && (
            <div>
              <p>No conversation. </p>
              <p className="inline-flex items-center gap-2">
                Click <FaRegPenToSquare className="text-green-400" /> above to
                create
              </p>
            </div>
          )}

          {!searchParam.get("type")
            ? conversationsFiltered?.map((item: ConversationType) => (
                <MessageRoomCard key={item._id} item={item} />
              ))
            : conversations.data
                ?.filter((item) => item.conversation_name !== null)
                .map((item: ConversationType) => (
                  <MessageRoomCard key={item._id} item={item} />
                ))}
        </div>
        {/* small screen */}
        <div className="sm:hidden flex flex-col w-full overflow-y-auto no-scrollbar h-full bg-cover bg-center">
          <Outlet />
        </div>
      </div>
      {/* right section and large screen */}
      <div
        className="w-[70%] sm:flex hidden flex-col h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.whatsapp_bg})` }}
      >
        <Outlet />
      </div>
    </section>
  );
}
