import { Outlet, useNavigate } from "react-router-dom";

import LeftPanelHeading from "../../components/home/LeftPanelHeading";
import SearchChat from "../../components/home/SearchChat";
import MessageRoomCard from "../../components/home/MessageRoomCard";
import { Images } from "../../../Images";
import { useEffect, useState } from "react";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import MobileTopTab from "../../components/generic/MobileTopTab";
// import { addRoomData } from "../../slice";
// import { useSelector, useDispatch } from "react-redux";
// import { chatAppType } from "../../sliceType";
import axios from "axios";
import { messageRoomType } from "../../type/messageRoomType";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

export default function HomeLayout({}: {}) {
  const [roomCredential, setroomCredential] = useState<messageRoomType[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<boolean>(
    socket.connected
  );

  // console.log(connectionStatus);
  const redirect = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (!user.data || user.data.email === "undefined") {
      return redirect("/login");
    }
  }, []);

  useEffect(() => {
    function onGetCreateRoom(roomsCredential: any) {
      console.log(roomsCredential);
      setroomCredential((prev) => [...prev, roomsCredential]);
    }

    function OnConnect() {
      setConnectionStatus(true);
    }

    function OnDisConnect() {
      setConnectionStatus(false);
    }

    socket.on("connect", OnConnect);
    socket.on("disconnect", OnDisConnect);
    socket.on("getCreateRoom", onGetCreateRoom);

    return () => {
      socket.off("getCreateRoom", onGetCreateRoom);
      socket.off("connect", OnConnect);
      socket.off("disconnect", OnDisConnect);
    };
  }, []);

  const { isLoading, isError } = useQuery({
    queryKey: ["roomCredential"],
    queryFn: async () => {
      const req = await axios({
        method: "get",
        url: `http://localhost:7000/room/${user.data.email}`,
      });
      // console.log(req.data);
      setroomCredential(req.data);
      return req.data;
    },
  });

  return (
    <section className="flex w-full h-full gap-1">
      {/* left section */}
      <div className="md:w-[30%] sm:w-[40%] w-full flex flex-col h-screen sm:p-2">
        <div className="sm:bg-transparent bg-[#075E55] p-2 sm:text-inherit text-white/75">
          <LeftPanelHeading />
          <SearchChat />
          <MobileTopTab />
        </div>

        {/* large screen left panel */}
        <div className="overflow-y-auto  sm:flex hidden flex-col mt-4 space-y-0.5 h-full">
          <span>Connection status: {connectionStatus}</span>
          {isLoading && (
            <div className="h-full flex flex-col justify-center items-center">
              <FaSpinner className="animate-spin h-8 w-8" />
            </div>
          )}
          {isError && (
            <div className="h-full">
              <span className="text-red-400">Something went wrong</span>
            </div>
          )}
          {roomCredential.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
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
