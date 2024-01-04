import { motion, AnimatePresence } from "framer-motion";
import MessageRoomCard from "./MessageRoomCard";
import { messageRoomData } from "../../dummyData/messageRoom_data";
import { createNewRoomDropDownVariant } from "../../framerMotion_variants/newRoomDropDownVariants";

interface CreateNewRoomDropDownProps {
  newRoomDropDownStatus: boolean;
}

export default function FilterDropDown({
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
        <h4 className="w-full text-xl ">Filter chats by</h4>

        <motion.div className="overflow-y-auto no-scrollbar">
          {messageRoomData.map((item, index) => (
            <MessageRoomCard key={index} item={item} />
          ))}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
