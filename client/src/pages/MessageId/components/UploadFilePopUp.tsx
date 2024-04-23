import { TbPhoto } from "react-icons/tb";
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdOutlinePoll } from "react-icons/md";
// import { Dispatch, SetStateAction } from "react";

interface UploadFilePopUpProps {
  openPollModal: () => void;
}

export default function UploadFilePopUp({
  openPollModal,
}: UploadFilePopUpProps) {
  return (
    <section className="absolute bottom-12 bg-black/50 text-white/80 ml-2 flex flex-col space-y-2 drop-shadow-md px-4 py-2 rounded-md">
      <span className="flex gap-2 cursor-not-allowed items-center hover:text-white/80">
        <TbPhoto />
        Photo/Video
      </span>

      <span className="flex gap-2 cursor-not-allowed items-center hover:text-white/80">
        <HiOutlineCamera />
        Camera
      </span>

      <span className="flex gap-2 cursor-not-allowed items-center hover:text-white/80">
        <HiOutlineDocumentPlus />
        Document
      </span>

      <span
        onClick={() => openPollModal()}
        className="flex gap-2 items-center cursor-pointer hover:text-white/80"
      >
        <MdOutlinePoll />
        Poll
      </span>
    </section>
  );
}
