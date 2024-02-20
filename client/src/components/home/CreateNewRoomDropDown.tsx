import { motion, AnimatePresence } from "framer-motion";
import MessageRoomCard from "./MessageRoomCard";
import { messageRoomData } from "../../dummyData/messageRoom_data";
import { IoPeopleOutline } from "react-icons/io5";
import { createNewRoomDropDownVariant } from "../../framerMotion_variants/newRoomDropDownVariants";
import { socket } from "../../socketIo";
import { useEffect, useState } from "react";
import { useUser } from "../../customHooks/useUser";
import moment from "moment";
import { convertToUrlFriendly } from "../generic/convertToUrlFreiendly";
import axios from "axios";
import { messageRoomType } from "../../type/messageRoomType";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

interface CreateNewRoomDropDownProps {
  newRoomDropDownStatus: boolean;
  closeModal: () => void;
}

export default function CreateNewRoomDropDown({
  newRoomDropDownStatus,
  closeModal,
}: CreateNewRoomDropDownProps) {
  const [room, setRoom] = useState("");
  const [roomCredential, setroomCredential] = useState<messageRoomType[]>([]);
  const currentTime = moment().format("h:mma");
  const user = useUser();

  const handleCreateRoom = async () => {
    if (!room || room.length < 1) {
      return;
    }

    socket.emit("createRoom", {
      userEmail: user.data.email,
      roomUniqueName: convertToUrlFriendly(room),
      avatar: user.data.profile_img,
      time: currentTime,
    });

    closeModal();
  };

  useEffect(() => {
    if (socket) {
      socket.on("getCreateRoom", (roomsCredential) => {
        setroomCredential((prev) => [...prev, roomsCredential]);
      });
    }

    return () => {
      socket.off("getCreateRoom");
    };
  }, [socket]);

  const { isLoading, isError } = useQuery({
    queryKey: ["roomCredential"],
    queryFn: async () => {
      const req = await axios({
        method: "get",
        url: `http://localhost:7000/room/${user.data.email}`,
      });
      console.log(req.data);
      setroomCredential(req.data);
      // dispatch(addRoomData(req.data));
      return req.data;
    },
  });

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
        </button>

        <h5 className="mt-2">All contacts</h5>
        <motion.div className="overflow-y-auto no-scrollbar space-y-0.5">
          {isLoading && (
            <div className="h-full flex flex-col justify-center items-center">
              <FaSpinner className="animate-spin h-12 w-12 bg-white" />
            </div>
          )}
          {isError && (
            <div className="h-full">
              <span>Something went wrong</span>
            </div>
          )}
          {roomCredential.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
