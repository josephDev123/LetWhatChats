import { Images } from "../../../../Images";
import { AiOutlineClose } from "react-icons/ai";

interface MediaViewModalType {
  setUploadMediaModalOpen: (value: boolean) => void;
}
export default function MediaViewModal({
  setUploadMediaModalOpen,
}: MediaViewModalType) {
  return (
    <section className="flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col bg-black/50 p-2  drop-shadow-md">
        <AiOutlineClose
          onClick={() => setUploadMediaModalOpen(false)}
          className="ms-auto cursor-pointer p-1 rounded-full text-white hover:bg-green-300 hover:text-white text-2xl"
        />
        <div className="bg-gray-300 h-full p-2">
          <img
            src={Images.cellPhone}
            alt=""
            loading="lazy"
            width={400}
            height={400}
          />
        </div>

        <input
          type="text"
          value=""
          placeholder="Caption(optional)"
          className="p-2 bg-transparent outline-none"
          autoFocus
        />
      </div>
    </section>
  );
}
