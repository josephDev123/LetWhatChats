import { motion, AnimatePresence } from "framer-motion";
import MessageRoomCard from "./MessageRoomCard";
import { messageRoomData } from "../../dummyData/messageRoom_data";
import { IoPeopleOutline } from "react-icons/io5";
import { createNewRoomDropDownVariant } from "../../framerMotion_variants/newRoomDropDownVariants";

interface CreateNewRoomDropDownProps {
  newRoomDropDownStatus: boolean;
}

export default function CreateNewRoomDropDown({
  newRoomDropDownStatus,
}: CreateNewRoomDropDownProps) {
  return (
    <AnimatePresence>
      <motion.section
        layout
        initial={{ opacity: 1 }}
        animate={newRoomDropDownStatus ? "open" : "closed"}
        variants={createNewRoomDropDownVariant}
        className="absolute bottom-0 top-6 p-4 drop-shadow-md rounded-md w-[300px] h-[500px] flex flex-col text-white bg-black/75 z-30"
      >
        <h4 className="w-full text-xl ">New chat</h4>
        <input
          type="search"
          placeholder="create name"
          className="p-2 mt-2 rounded-md focus:outline-none bg-slate-100 focus:border-b focus:border-green-500"
        />

        <div className="flex gap-4"></div>
        <button
          type="button"
          className="self-start p-1 flex gap-4 items-center mt-2 w-full rounded-sm hover:bg-slate-200 focus:border-b-2 border-green-500"
        >
          <IoPeopleOutline className="bg-slate-200 rounded-full p-2 text-4xl" />
          <span>Create Room</span>
        </button>

        <h5 className="mt-2">All contacts</h5>
        <motion.div className="overflow-y-auto no-scrollbar">
          {messageRoomData.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}