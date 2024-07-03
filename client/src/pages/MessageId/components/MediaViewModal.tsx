import { AiOutlineClose } from "react-icons/ai";
import { useUploadFirebaseToFirebase } from "../../../customHooks/useUploadToFirebase";
import { FormEvent, SetStateAction } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";

interface MediaViewModalType {
  closeModal: () => void;
  fileToUpload: string;
  mediaType: string;
  handleSubmitMessage: (e: FormEvent<Element>) => void;
  setChat: React.Dispatch<SetStateAction<string>>;
}
export default function MediaViewModal({
  closeModal,
  fileToUpload,
  mediaType,
  handleSubmitMessage,
  setChat,
}: MediaViewModalType) {
  const filetypeExtract = mediaType.split("/")[0];
  console.log("media view ", fileToUpload);
  const { downloadedUrl, errorMsg, uploadStageStatus } =
    useUploadFirebaseToFirebase();
  console.log(downloadedUrl, errorMsg, uploadStageStatus);
  return (
    <section className="flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col bg-black/50 p-2  drop-shadow-md">
        <AiOutlineClose
          onClick={closeModal}
          className="ms-auto cursor-pointer p-1 rounded-full text-white hover:bg-green-300 hover:text-white text-2xl"
        />

        <div className="bg-gray-300 h-[400px] w-[400px] p-2 ">
          {filetypeExtract === "image" && (
            <img
              src={fileToUpload}
              alt=""
              loading="lazy"
              width={400}
              height={400}
              className="objec"
            />
          )}

          {filetypeExtract === "video" && (
            <video width="320" height="240" controls>
              <source src={fileToUpload} type={mediaType} />
            </video>
          )}
        </div>

        <input
          onChange={(e) => setChat(e.target.value)}
          type="text"
          // value=""
          placeholder="Caption(optional)"
          className="p-2 bg-transparent outline-none focus:border rounded-md border-gray-300 my-2 text-white"
          autoFocus
        />
        <button
          type="button"
          className="self-end text-white"
          onClick={handleSubmitMessage}
        >
          <MdOutlineRocketLaunch className="bg-green-600  hover:bg-green-700 text-3xl p-2 text-black rounded-md" />
        </button>
      </div>
    </section>
  );
}
