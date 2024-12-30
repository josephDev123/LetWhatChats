import { AiOutlineClose } from "react-icons/ai";
// import { useUploadFirebaseToFirebase } from "../../../customHooks/useUploadToFirebase";
import { FormEvent, SetStateAction } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
// import { deleteFileOnFirebase } from "../../../utils/deleteFileOnFirebase";

interface MediaViewModalType {
  closeModal: () => void;
  fileToUpload: string;
  mediaType: string;
  handleSubmitMessage: (e?: FormEvent<Element>) => void;
  setChat: React.Dispatch<SetStateAction<string>>;
  chat: string;
  fileRef: string;
  setfileRef: React.Dispatch<SetStateAction<string>>;
}
export default function MediaViewModal({
  closeModal,
  fileToUpload,
  mediaType,
  handleSubmitMessage,
  setChat,
  chat,
  fileRef,
  setfileRef,
}: MediaViewModalType) {
  const filetypeExtract = mediaType.split("/")[0];
  console.log("media view ", fileToUpload);
  // const { downloadedUrl, errorMsg, uploadStageStatus } =
  //   useUploadFirebaseToFirebase();
  console.log(fileRef);
  const handleCloseModal = async () => {
    try {
      // await deleteFileOnFirebase(fileRef);
      closeModal();
      setfileRef(" ");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col h-full justify-center items-center  overflow-y-auto sm:w-[400px] w-[90%] no-scrollbar">
      <div className="flex flex-col justify-center items-center w-full h-fit bg-black/50 p-2  drop-shadow-md">
        <AiOutlineClose
          onClick={handleCloseModal}
          className="ms-auto cursor-pointer p-1 rounded-full text-white hover:bg-green-300 hover:text-white text-2xl"
        />

        <div className="bg-gray-300 h-[400px] sm:w-[350px] w-fit p-2 overflow-y-auto">
          {filetypeExtract === "image" && (
            <img
              src={fileToUpload}
              alt=""
              loading="lazy"
              width={400}
              height={400}
              className="object-contain"
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
          className="p-2 bg-transparent outline-none w-full focus:border rounded-md border-gray-300 my-2 text-white sm:border-none border"
          autoFocus
        />
        <button
          type="button"
          className="self-end text-white"
          onClick={() => {
            if (!chat) return;
            closeModal();
            handleSubmitMessage();
          }}
        >
          <MdOutlineRocketLaunch className="bg-green-600  hover:bg-green-700 text-3xl p-2 text-black rounded-md" />
        </button>
      </div>
    </section>
  );
}
