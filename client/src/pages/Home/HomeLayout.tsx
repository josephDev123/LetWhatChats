import { Outlet } from "react-router-dom";
import { getCredential } from "../../utils/getCredential";
import LeftPanelHeading from "../../components/home/LeftPanelHeading";
import SearchChat from "../../components/home/SearchChat";
import MessageRoomCard from "../../components/home/MessageRoomCard";
import { messageRoomType } from "../../type/messageRoomType";
import { Images } from "../../../Images";
import { useEffect, useState } from "react";
import { socket } from "../../socketIo";

export default function HomeLayout({}: {}) {
  const [rooms, setRooms] = useState<messageRoomType[]>([]);
  const { userData } = getCredential();

  useEffect(() => {
    socket.on("getRoom", (roomsCredential) => {
      setRooms((prev) => [...prev, roomsCredential]);
    });
  }, []);

  return (
    <section className="flex w-full h-full gap-1">
      {/* left section */}
      <div className="w-[30%] flex flex-col h-screen p-2">
        <LeftPanelHeading />
        <SearchChat />
        <div className="overflow-y-auto mt-4">
          {rooms.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </div>
      </div>
      {/* right section */}
      <div
        className="w-[70%] flex flex-col h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.whatsapp_bg})` }}
      >
        <Outlet />
      </div>
    </section>
  );
}
