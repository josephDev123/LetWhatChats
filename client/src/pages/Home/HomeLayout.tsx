import { Outlet } from "react-router-dom";
import { getCredential } from "../../utils/getCredential";
import LeftPanelHeading from "../../components/home/LeftPanelHeading";
import SearchChat from "../../components/home/SearchChat";
import MessageRoomCard from "../../components/home/MessageRoomCard";
import { messageRoomData } from "../../dummyData/messageRoom_data";
import { Images } from "../../../Images";

export default function HomeLayout({}: {}) {
  const { userData } = getCredential();
  console.log(userData);
  return (
    <section className="flex w-full h-full gap-1">
      {/* left section */}
      <div className="w-[30%] flex flex-col h-screen p-2">
        <LeftPanelHeading />
        <SearchChat />
        <div className="overflow-y-auto mt-4">
          {messageRoomData.map((item, index) => (
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
