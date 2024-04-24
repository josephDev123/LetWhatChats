import { messageRoomType } from "../../../type/messageRoomType";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { convertToUrlFriendly } from "../../../generic/convertToUrlFreiendly";
import { addRoomData } from "../../../slice";
import { useDispatch } from "react-redux";
import { generateRandomAlphaNumeric } from "../../../utils/longAlphaNumericString";

type MessageRoomCard = {
  item: messageRoomType;
};
export default function MessageRoomCard({ item }: MessageRoomCard) {
  const [isOpenGroupLinkDropDown, setIsOpenGroupLinkDropDown] = useState(false);
  const redirect = useNavigate();
  const dispatch = useDispatch();

  const handleCopyGroupLink = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    roomName: string
  ) => {
    e.stopPropagation();
    if (!window.navigator.clipboard) {
      return alert("Your browser does not support this");
    }
    await window.navigator.clipboard.writeText(
      `${
        import.meta.env.VITE_HOSTNAME
      }/${roomName}/invite/${generateRandomAlphaNumeric(20)}`
    );

    setIsOpenGroupLinkDropDown(false);
  };

  return (
    <motion.section
      onClick={() => {
        dispatch(addRoomData(item));
        redirect(convertToUrlFriendly(`/${item.roomUniqueName}`));
      }}
      className="flex gap-2 items-center hover:bg-slate-200 p-3 rounded-md cursor-pointer bg-green-50"
    >
      <img
        src={item.avatar}
        alt="profile_avatar"
        width={12}
        height={12}
        loading="lazy"
        className="sm:h-12 sm:w-12 w-8 h-8 rounded-full border border-black"
      />

      <div className="flex flex-col ">
        <div className="flex justify-between gap-4 items-center">
          <h5 className="font-semibold line-clamp-1">{item.roomUniqueName}</h5>
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
      <div className="ms-auto relative">
        <BsThreeDots
          className="hover:bg-green-400 rounded-full p-1 text-xl"
          onClick={(e: any) => {
            e.stopPropagation();
            setIsOpenGroupLinkDropDown((prev) => !prev);
          }}
        />
        {isOpenGroupLinkDropDown && (
          <div
            onClick={(e) => handleCopyGroupLink(e, item.roomUniqueName)}
            className="absolute top-6 z-10 right-0 drop-shadow-md p-1 w-36 h-8 rounded-sm bg-gray-50"
          >
            Copy group link
          </div>
        )}
      </div>
    </motion.section>
  );
}
