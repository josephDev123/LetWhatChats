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
import { useGeneralMutation } from "../../../utils/useMutationFacade";
import { joinConversationDTO } from "../../../type/JoinConversationDTO";
import { FaSpinner } from "react-icons/fa6";

type MessageRoomCard = {
  item: ConversationType;
};
export default function MessageRoomCard({ item }: MessageRoomCard) {
  const [isProfileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const { mutateAsync, isPending } = useGeneralMutation<
    any,
    joinConversationDTO
  >("post", "group-member/join");
  const findUserById = item.ConversationWithMember.find(
    (member) => member.user_id === user?.data?._id
  );

  // console.log("find", findUserById);

  const handleJoinConversation = () => {
    mutateAsync(
      { conversation_id: item._id, user_id: user.data._id },
      {
        onError: (error) => {
          toast.error(`Something went wrong:${error.message}. Check Network.`);
        },
        onSuccess() {
          toast.success("Join successfully");
        },
      }
    );
  };

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
          src={item.avatar || "https://avatars.dicebear.com/api/human/123.svg"}
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
      <div className="ms-auto relative inline-flex items-center">
        {!findUserById && (
          <button
            onClick={handleJoinConversation}
            className="px-2 bg-green-400 inline-flex gap-1 items-center hover:bg-green-300 rounded-md"
          >
            {item.conversation_name && "Join"}{" "}
            {isPending && (
              <FaSpinner className="animate-spin h-4 w-4 text-white ms-auto" />
            )}
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
            onClick={() => {
              if (user.data._id !== item.creator) {
                toast.error("Only the Creator can edit");
                return;
              }
              return navigate(`/conversation/${item._id}`);
            }}
            className={`absolute ${
              user.data._id !== item.creator && " cursor-not-allowed"
            } top-6 z-10 right-0 drop-shadow-md p-1 w-36 h-8 rounded-sm bg-gray-50`}
          >
            Edit Conversation
          </button>
        )}
      </div>
    </motion.section>
  );
}
