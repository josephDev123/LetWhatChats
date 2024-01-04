import { Images } from "../../../Images";
import { messageRoomType } from "../../type/messageRoomType";

type MessageRoomCard = {
  item: messageRoomType;
};
export default function MessageRoomCard({ item }: MessageRoomCard) {
  return (
    <section className="flex gap-2 items-center hover:bg-slate-200 p-3 rounded-md cursor-pointer">
      <img
        src={Images.avatar_one_png}
        alt="profile_avatar"
        width={12}
        height={12}
        className="h-12 w-12 rounded-full border border-black"
      />

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h5 className="font-semibold">{item.roomUniqueName}</h5>
          <span className="text-green-500">{item.time}</span>
        </div>

        <p className="flex gap-2 ">
          <span className="text-slate-500 line-clamp-1">
            {item.name} : {item.content}
          </span>
          {/* <span className="text-slate-500 text-ellipsis"></span> */}
        </p>
      </div>
    </section>
  );
}
