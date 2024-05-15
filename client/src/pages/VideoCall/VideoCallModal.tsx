import { forwardRef, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface IVideoCallModal {
  closeModal: () => void;
  localVideoStream: MediaStream | null;
}

export const VideoCallModal = ({
  closeModal,
  localVideoStream,
}: IVideoCallModal) => {
  let videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && localVideoStream) {
      videoRef.current.srcObject = localVideoStream;
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [localVideoStream]);
  return (
    <section className="fixed inset-0 flex flex-col justify-center items-center h-full w-full bg-transparent/30">
      <div className="grid grid-cols-4 bg-white w-[80%] h-[80%] rounded-md drop-shadow-md p-2 relative">
        <IoClose
          onClick={closeModal}
          className="absolute text-xl right-4 top-2 hover:bg-green-200 hover:rounded-full hover:text-gray-500 cursor-pointer"
        />

        <video
          ref={videoRef}
          width={600}
          height={400}
          autoPlay
          playsInline
          muted
        />
      </div>
    </section>
  );
};
