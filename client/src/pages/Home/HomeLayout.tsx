import { Outlet, useNavigate } from "react-router-dom";

import LeftPanelHeading from "../../components/home/LeftPanelHeading";
import SearchChat from "../../components/home/SearchChat";
import MessageRoomCard from "../../components/home/MessageRoomCard";
import { messageRoomType } from "../../type/messageRoomType";
import { Images } from "../../../Images";
import { useEffect, useState } from "react";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import MobileTopTab from "../../components/generic/MobileTopTab";

export default function HomeLayout({}: {}) {
  const [rooms, setRooms] = useState<messageRoomType[]>([]);
  console.log(rooms);
  const redirect = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (!user.data || user.data.email === "undefined") {
      return redirect("/login");
    }
  }, []);

  if (socket) {
    socket.on("getCreateRoom", (roomsCredential) => {
      setRooms([...rooms, roomsCredential]);
    });
  }

  return (
    <section className="flex w-full h-full gap-1">
      {/* left section */}
      <div className="sm:w-[30%] w-full flex flex-col h-screen sm:p-2">
        <div className="sm:bg-transparent bg-[#075E55] p-2 sm:text-inherit text-white/75">
          <LeftPanelHeading />
          <SearchChat />
          <MobileTopTab />
        </div>

        <div className="overflow-y-auto sm:flex hidden flex-col mt-4">
          {rooms.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </div>
        <div className="sm:hidden flex flex-col h-screen bg-cover bg-center p-2">
          <Outlet />
        </div>
      </div>
      {/* right section */}
      <div
        className="w-[70%] sm:flex hidden flex-col h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.whatsapp_bg})` }}
      >
        <Outlet />
      </div>
    </section>
  );
}
