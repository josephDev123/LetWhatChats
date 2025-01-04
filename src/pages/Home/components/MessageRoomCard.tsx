// import { messageRoomType } from "../../../type/messageRoomType";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { BsThreeDots } from "react-icons/bs";
// import { convertToUrlFriendly } from "../../../generic/convertToUrlFreiendly";
// import { addRoomData } from "../../../lib/redux/slices/slice";
// import { useDispatch } from "react-redux";
// import { generateRandomAlphaNumeric } from "../../../utils/longAlphaNumericString";
import { ConversationType } from "../../../type/dbConversationType";
import { useUser } from "../../../customHooks/useUser";
import { toast } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

type MessageRoomCard = {
  item: ConversationType;
};
export default function MessageRoomCard({ item }: MessageRoomCard) {
  const [isProfileDropdown, setProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const user = useUser();
  const findUserById = item.ConversationWithMember.find(
    (member) => `${member.user_id} === ${user?.data?._id}`
  );

  // console.log("find", findUserById);

  const handleNavigate = () => {
    if (findUserById) {
      return navigate(`/chat/${item._id}`);
    }
    toast.error("You are not a member of this room");
  };

  return (
    <motion.section className="flex gap-2 items-center hover:bg-slate-200 p-3 rounded-md cursor-pointer bg-green-50">
      {!item.conversation_name ? (
        <div className="inline-flex " onClick={handleNavigate}>
          <span className="">
            <img
              src={item.ConversationWithMember[0].userDetails[0].profile_img}
              alt=" avatar"
              title={item.ConversationWithMember[0].userDetails[0].name}
              width={6}
              height={6}
              loading="lazy"
              className="sm:h-8 sm:w-8 w-5 h-5 rounded-full border border-black"
            />
          </span>

          <span className="translate-x-[-12px]">
            <img
              src={item.ConversationWithMember[1].userDetails[0].profile_img}
              alt=" avatar"
              title={item.ConversationWithMember[1].userDetails[0].name}
              width={6}
              height={6}
              loading="lazy"
              className="sm:h-8 sm:w-8 w-5 h-5 rounded-full border border-black"
            />
          </span>
        </div>
      ) : (
        <img
          src={"https://avatars.dicebear.com/api/human/123.svg"}
          alt=" avatar"
          width={12}
          height={12}
          loading="lazy"
          className="sm:h-12 sm:w-12 w-8 h-8 rounded-full border border-black"
        />
      )}

      <div className="flex flex-col" onClick={handleNavigate}>
        <div className="flex justify-between gap-4 items-center">
          <h5 className="font-semibold line-clamp-1">
            {item.conversation_name}
          </h5>
          {/* <span className="text-green-500">5:47pm</span> */}
        </div>
      </div>
      <div className="ms-auto relative">
        {!findUserById && (
          <button className="px-2 bg-green-400 hover:bg-green-300 rounded-md">
            {item.conversation_name && "Join"}
          </button>
        )}

        {item.conversation_name && (
          <BsThreeDots
            className="hover:bg-green-400 rounded-full p-1 text-xl"
            onClick={(e: any) => {
              e.stopPropagation();
              setProfileDropdown((prev) => !prev);
            }}
          />
        )}
        {isProfileDropdown && (
          <button
            onClick={() => alert("coming soon ...")}
            // disabled
            className="absolute cursor-not-allowed top-6 z-10 right-0 drop-shadow-md p-1 w-36 h-8 rounded-sm bg-gray-50"
          >
            Edit Conversation
          </button>
        )}
      </div>
    </motion.section>
  );
}
