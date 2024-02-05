import { Outlet, useNavigate } from "react-router-dom";

import LeftPanelHeading from "../../components/home/LeftPanelHeading";
import SearchChat from "../../components/home/SearchChat";
import MessageRoomCard from "../../components/home/MessageRoomCard";
import { Images } from "../../../Images";
import { useEffect } from "react";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import MobileTopTab from "../../components/generic/MobileTopTab";
import { addRoomData } from "../../slice";
import { useSelector, useDispatch } from "react-redux";
import { chatAppType } from "../../sliceType";

export default function HomeLayout({}: {}) {
  const dispatch = useDispatch();
  const rooms = useSelector((state: chatAppType) => state.roomCredential);
  console.log(rooms);
  const redirect = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (!user.data || user.data.email === "undefined") {
      return redirect("/login");
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("getCreateRoom", (roomsCredential) => {
        console.log(roomsCredential);
        dispatch(addRoomData(roomsCredential));
      });
    }

    return () => {
      socket.off("getCreateRoom");
    };
  }, [rooms, dispatch, socket]);

  return (
    <section className="flex w-full h-full gap-1">
      {/* left section */}
      <div className="md:w-[30%] sm:w-[40%] w-full flex flex-col h-screen sm:p-2">
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
        {/* small screen */}
        <div className="sm:hidden flex flex-col h-screen bg-cover bg-center p-2">
          <Outlet />
        </div>
      </div>
      {/* right section and large screen*/}
      <div
        className="w-[70%] sm:flex hidden flex-col h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.whatsapp_bg})` }}
      >
        <Outlet />
      </div>
    </section>
  );
}
