import { IoClose } from "react-icons/io5";

interface IVideoCallModal {
  closeModal: () => void;
}

export default function VideoCallModal({ closeModal }: IVideoCallModal) {
  return (
    <section className="fixed inset-0 flex flex-col justify-center items-center h-full w-full bg-transparent/30">
      <div className="grid grid-cols-4 bg-white w-[80%] h-[80%] rounded-md drop-shadow-md p-2 relative">
        <IoClose
          onClick={closeModal}
          className="absolute text-xl right-4 top-2 hover:bg-green-200 hover:rounded-full hover:text-gray-500 cursor-pointer"
        />
        VideoCallModal
      </div>
    </section>
  );
}
