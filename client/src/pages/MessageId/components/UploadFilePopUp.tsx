import { TbPhoto } from "react-icons/tb";
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdOutlinePoll } from "react-icons/md";
import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { useUploadFirebaseToFirebase } from "../../../customHooks/useUploadToFirebase";
// import { Dispatch, SetStateAction } from "react";

interface UploadFilePopUpProps {
  openPollModal: () => void;
  setFileToUpload: (value: string) => void;
  setMediaTypeTobeUpload: (value: string) => void;
  setfileRef: React.Dispatch<SetStateAction<string>>;
}

export default function UploadFilePopUp({
  openPollModal,
  setFileToUpload,
  setMediaTypeTobeUpload,
  setfileRef,
}: UploadFilePopUpProps) {
  const fileVideoRef = useRef<HTMLInputElement>(null);
  const { downloadedUrl, errorMsg, uploadStageStatus, uploadFile, FileRef } =
    useUploadFirebaseToFirebase();
  console.log(downloadedUrl, errorMsg, uploadStageStatus, FileRef);
  setFileToUpload(downloadedUrl);
  setfileRef(FileRef);

  async function handlefileAndVideo(e: ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement;
    const media: File | undefined = fileInput.files?.[0];

    if (!media) {
      alert("no File selected ");
      console.error("no File selected ");
      return;
    }
    const maxSizeInBytes = 3 * 1024 * 1024; // 1 MB in bytes

    if (media.size > maxSizeInBytes) {
      alert("File size exceeds 1 MB");
      console.error("File size exceeds 1 MB");
      return null; // Return null if file size exceeds 1 MB
    }
    setMediaTypeTobeUpload(media.type);
    try {
      await uploadFile("/chat", media);
      console.log("File uploaded successfully:", downloadedUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  return (
    <section className="absolute bottom-12 bg-black/50 text-white/80 ml-2 flex flex-col space-y-2 drop-shadow-md px-4 py-2 rounded-md">
      <div className="flex  flex-col">
        <div>
          {uploadStageStatus ? (
            <p className="text-xs text-green-400">{uploadStageStatus}...</p>
          ) : errorMsg ? (
            <p className="text-xs text-red-400">{errorMsg}</p>
          ) : (
            ""
          )}
        </div>

        <span
          onClick={() => fileVideoRef?.current?.click()}
          className="flex gap-2 cursor-pointer items-center hover:text-white/80"
        >
          <input
            onChange={handlefileAndVideo}
            ref={fileVideoRef}
            type="file"
            name=""
            id=""
            className="hidden"
          />
          <TbPhoto />
          Photo/Video
        </span>
      </div>

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
