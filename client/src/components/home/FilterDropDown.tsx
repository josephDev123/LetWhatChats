import { motion, AnimatePresence } from "framer-motion";
import { createNewRoomDropDownVariant } from "../../framerMotion_variants/newRoomDropDownVariants";
import { CiUnread } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoPencilOutline } from "react-icons/io5";

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
        className="absolute bottom-0  right-0 top-6 p-4 drop-shadow-md rounded-md w-[200px] h-[250px] flex flex-col text-white bg-black/75 z-30"
      >
        <h4 className="w-full text-xl mb-3">Filter chats by</h4>

        <motion.div className="space-y-2">
          <span className="flex gap-2 items-center cursor-pointer hover:text-white/80">
            <CiUnread />
            Unread
          </span>

          <span className="flex gap-2 items-center cursor-pointer hover:text-white/80">
            <RiContactsLine />
            Contacts
          </span>
          <span className="flex gap-2 items-center cursor-pointer hover:text-white/80">
            <BsPeople />
            Non-Contacts
          </span>
          <span className="flex gap-2 items-center cursor-pointer hover:text-white/80">
            <HiOutlineUserGroup />
            Groups
          </span>

          <span className="flex gap-2 items-center cursor-pointer hover:text-white/80">
            <IoPencilOutline />
            Drafts
          </span>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
