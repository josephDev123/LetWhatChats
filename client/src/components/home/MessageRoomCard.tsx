import { messageRoomType } from "../../type/messageRoomType";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type MessageRoomCard = {
  item: messageRoomType;
};
export default function MessageRoomCard({ item }: MessageRoomCard) {
  const redirect = useNavigate();

  return (
    <motion.section
      onClick={() => redirect(item.roomUniqueName)}
      className="flex gap-2 items-center hover:bg-slate-200 sm:p-3 rounded-md cursor-pointer"
    >
      <img
        src={item.avatar}
        alt="profile_avatar"
        width={12}
        height={12}
        loading="lazy"
        className="sm:h-12 sm:w-12 w-10 h-10 rounded-full border border-black"
      />

      <div className="flex flex-col">
        <div className="flex justify-between gap-4 items-center">
          <h5 className="font-semibold">{item.roomUniqueName}</h5>
          <span className="text-green-500">{item.time}</span>
        </div>

        {item.name && item.content && (
          <p className="flex gap-2 ">
            <span className="text-slate-500 line-clamp-1">
              {item?.name} : {item?.content}
            </span>
            {/* <span className="text-slate-500 text-ellipsis"></span> */}
          </p>
        )}
      </div>
    </motion.section>
  );
}
