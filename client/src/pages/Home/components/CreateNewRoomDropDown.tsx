import { motion, AnimatePresence } from "framer-motion";
import MessageRoomCard from "./MessageRoomCard";
import { messageRoomData } from "../../../dummyData/messageRoom_data";
import { IoPeopleOutline } from "react-icons/io5";
import { createNewRoomDropDownVariant } from "../../../framerMotion_variants/newRoomDropDownVariants";
import { socket } from "../../../socketIo";
import { useEffect, useState } from "react";
import { useUser } from "../../../customHooks/useUser";
import moment from "moment";
import { convertToUrlFriendly } from "../../../generic/convertToUrlFreiendly";
import { messageRoomType } from "../../../type/messageRoomType";
import { FaSpinner } from "react-icons/fa6";
// import { useCreateConversationMutation } from "../../../customHooks/useCreateRoom";
import { useQueryFacade } from "../../../utils/GetConversationFacade";
import { axiosDefault, axiosInstance } from "../../../lib/axios/axiosInstance";
import { User } from "../../../type/dbUserType";
import { useCreateMutation } from "../../../utils/createConverationFacade";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { setTrigger } from "../../../lib/redux/slices/triggerQueryRefresh";

interface CreateNewRoomDropDownProps {
  newRoomDropDownStatus: boolean;
  closeModal: () => void;
}

export default function CreateNewRoomDropDown({
  newRoomDropDownStatus,
  closeModal,
}: CreateNewRoomDropDownProps) {
  const [room, setRoom] = useState("");
  const user = useUser();
  const dispatch = useAppDispatch();

  const contacts = useQueryFacade(["users"], async () => {
    const response = axiosDefault({
      method: "get",
      url: `auth/users`,
    });
    return (await response).data.data;
  });

  const { mutate, isPending } = useCreateMutation(
    async () => {
      try {
        return axiosInstance.post("conversation/create", {
          conversation_name: room,
          user_id: user.data._id,
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data);
        }
        throw new Error("something went wrong");
      }
    },
    () => {
      dispatch(
        setTrigger({
          signal: `conversation${Math.random()}`,
          type: "conversation",
        })
      );
      closeModal();
    }
  );

  const handleCreateRoom = async () => {
    if (!room || room.length < 1) {
      return;
    }

    mutate({ onSuccess: () => closeModal() });
  };

  return (
    <AnimatePresence>
      <motion.section
        layout
        initial={{ opacity: 1 }}
        animate={newRoomDropDownStatus ? "open" : "closed"}
        variants={createNewRoomDropDownVariant}
        className="absolute bottom-0 top-7 lg:right-0 sm:left-32 right-0 p-4 drop-shadow-md rounded-md sm:w-[300px] w-full sm:h-[500px] h-[400px] overflow-y-auto no-scrollbar flex flex-col text-black bg-black/75 z-30"
      >
        <h4 className="w-full text-xl">New chat</h4>
        <input
          onChange={(e) => setRoom(e.target.value)}
          type="search"
          placeholder="create name"
          className="p-2 mt-2 rounded-md focus:outline-none text-black bg-slate-100 focus:border-b focus:border-green-500"
        />

        <div className="flex gap-4"></div>
        <button
          onClick={handleCreateRoom}
          type="button"
          className="self-start p-1 flex gap-4 items-center mt-2 w-full rounded-sm hover:text-black hover:bg-slate-200/30 focus:border-b-2 border-green-500"
        >
          <IoPeopleOutline className="bg-slate-200 rounded-full p-2 text-4xl" />
          <span className="text-white">Create Room</span>
          {isPending && (
            <FaSpinner className="animate-spin h-4 w-4 text-white ms-auto" />
          )}
        </button>

        <h5 className="mt-2 text-white">All contacts</h5>
        <motion.div className="overflow-y-auto no-scrollbar space-y-0.5 mt-2">
          {contacts.isLoading && (
            <div className="h-full flex flex-col justify-center items-center">
              <FaSpinner className="animate-spin h-8 w-8" />
            </div>
          )}

          {contacts.data?.map((user: User, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-green-50 hover:bg-green-100 rounded-md"
            >
              <div className="inline-flex gap-2 items-center text-black">
                <img
                  src={user.profile_img}
                  alt="avatar"
                  className=" w-8 h-8 rounded-full border"
                />

                <p>{user.name}</p>
              </div>

              <button className="p-0.5 px-2 rounded-md bg-green-400 hover:bg-green-300">
                Create
              </button>
            </div>
          ))}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
