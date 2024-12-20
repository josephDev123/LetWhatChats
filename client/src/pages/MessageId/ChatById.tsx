// import { useParams } from "react-router-dom";
import IncomingMessage from "./components/IncomingMessage";
import SentMessage from "./components/SentMessage";
import { GrEmoji } from "react-icons/gr";
import { GrFormAttachment } from "react-icons/gr";
import UploadFilePopUp from "./components/UploadFilePopUp";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import moment from "moment";
import { ChatDataType } from "../../type/chatDataType";
import style from "../../styles/mobile_bg.module.css";
import Emojipicker from "../../generic/EmojiPicker";
// import { useSelector, useDispatch } from "react-redux";
// import { chatAppType } from "../../sliceType";
import { FaSpinner } from "react-icons/fa6";
import PollingModal from "../../generic/PollingModal";
import Poll from "./components/Poll";
import { HiOutlineVideoCamera } from "react-icons/hi2";
// import { chatOrgType } from "../../lib/redux/slices/slice";
import { MdOutlineJoinInner } from "react-icons/md";
import MediaViewModal from "./components/MediaViewModal";

export default function ChatById() {
  const [toggleAttachment, setToggleAttachment] = useState(false);
  const [message, setMessage] = useState<ChatDataType[]>([]);
  // const unique_channelMember = Array.from(
  //   new Set(message.map((item) => JSON.stringify(item.name)))
  // ).map((item) => JSON.parse(item));
  // const channel_members = unique_channelMember.splice(0, 3);
  const [messageStatus, setmessageStatus] = useState("idle");
  console.log(setmessageStatus);
  const [isPollModalOpen, setPollModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState("");
  const [fileRef, setfileRef] = useState("");
  const [mediaTypeTobeUpload, setMediaTypeTobeUpload] = useState("");
  const [isEmojiModalOpen, setisEmojiModalOpen] = useState(false);
  // const isVideoModalOpen = useSelector(
  //   (state: chatOrgType) => state.isVideoModalOpen
  // );
  // const dispatch = useDispatch();
  // const roomCredential = useSelector(
  //   (state: chatAppType) => state.roomCredential
  // );

  const welcomeRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState("");
  const user = useUser();

  useEffect(() => {
    function handleWelcomeMessage(data: any) {
      if (welcomeRef.current) {
        welcomeRef.current.innerHTML = data;
      }
    }

    function handleExchangeMessage(chat: any) {
      // console.log(chat);
      setMessage((prevMessage) => [...prevMessage, chat]);
    }

    function handlePollMessage(data: ChatDataType) {
      // console.log(data);
      setMessage((prev) => [...prev, data]);
    }
    socket.on("welcomeMessage", handleWelcomeMessage);
    // Handle incoming chat messages
    socket.on("exchangeMessage", handleExchangeMessage);
    socket.on("listenToCreatePoll", handlePollMessage);

    return () => {
      socket.off("welcomeMessage", handleWelcomeMessage);
      socket.off("exchangeMessage", handleExchangeMessage);
      socket.off("listenToCreatePoll", handlePollMessage);
    };
  }, []);

  function handleSubmitMessage(e: FormEvent) {
    e.preventDefault();
    // console.log(user.data.name, room, chat);
    socket.emit("submitMessage", {
      name: user.data.name,

      chat,
      time: moment(new Date()).format("h:mm"),
      img: fileToUpload,
    });
    setChat("");
  }

  return (
    <section
      className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar ${style.backgroundImageContainer}`}
    >
      <div className="flex justify-between items-center py-2 px-4 bg-black/40">
        <div className="flex  gap-2">
          <div className="sm:w-12 sm:h-12 h-10 w-10 rounded-full hover:">
            <img
              src={"https://avatars.dicebear.com/api/human/123.svg"}
              alt="avatar"
              loading="lazy"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight text-white/80">
            <h5 className="font-bold text-sm sm:text-base">{""}</h5>
            <p className="text-sm sm:text-base ">
              <div className="flex justify-between gap-2 items-center">
                {/* {channel_members.map((item, index) => (
                  <p key={index}>{item},</p>
                ))} */}
                breteke, garri, juwon, mercy, joshua
              </div>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <HiOutlineVideoCamera
            // onClick={handleOpenVideoCall}
            className="text-white text-3xl  hover:bg-gray-50/25 rounded-md p-1 cursor-not-allowed"
          />

          <MdOutlineJoinInner
            // onClick={HandleJoinedVideoCall}
            className="text-white text-3xl cursor-pointer hover:bg-gray-50/25 rounded-md p-1"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 px-4 text-white/80 pt-8 mb-2">
        <div ref={welcomeRef}></div>

        {messageStatus === "loading" ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin h-8 w-8 text-white text-center" />
          </div>
        ) : messageStatus === "error" ? (
          <span className="text-sm text-red-400">Something went wrong</span>
        ) : (
          <>
            {message
              .filter((itemRoom) => itemRoom.room === "")
              .map((item, i) => (
                <Fragment key={i}>
                  {item.name !== user.data.name ? (
                    <>
                      {!item.chat ? "" : <IncomingMessage item={item} />}
                      {item.type === "poll" && (
                        <Poll
                          className="self-start"
                          item={item.poll_id}
                          chat={message}
                          setChat={setMessage}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {!item.chat ? "" : <SentMessage item={item} />}
                      {item.type === "poll" && (
                        <Poll
                          className="self-end"
                          item={item.poll_id}
                          chat={message}
                          setChat={setMessage}
                        />
                      )}
                    </>
                  )}
                </Fragment>
              ))}
          </>
        )}
      </div>

      <div
        className={`  sticky bottom-0  sm:text-white/80 text-black/50 font-semibold flex gap-4 mt-auto items-center py-2 px-4 bg-black/40`}
      >
        <GrEmoji
          onClick={() => setisEmojiModalOpen((prev) => !prev)}
          className="hover:bg-black/30 p-1 rounded-md text-3xl cursor-pointer"
        />
        <GrFormAttachment
          onClick={() => setToggleAttachment((prev) => !prev)}
          className="hover:bg-black/30 p-1 rounded-md text-3xl cursor-pointer"
        />
        <form
          onSubmit={handleSubmitMessage}
          className="flex justify-between w-full"
        >
          <input
            disabled={fileToUpload ? true : false}
            onChange={(e) => setChat(e.target.value)}
            type="text"
            value={chat}
            placeholder="Type a message"
            className="bg-transparent placeholder:text-black/50 w-full focus:outline-none"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {/* modals */}
      {isEmojiModalOpen && (
        <span className="absolute bottom-12">
          <Emojipicker
            setEmojidata={(item: any) => {
              setChat((prevText) => `${prevText}  ${item.emoji} `);
              setisEmojiModalOpen(false);
            }}
            className="h-96"
          />
        </span>
      )}

      {isPollModalOpen && (
        <span className="absolute bottom-12 ml-2">
          <PollingModal closeModal={() => setPollModalOpen(false)} />
        </span>
      )}

      {fileToUpload && (
        <div className="absolute bottom-12 ml-2">
          <MediaViewModal
            fileRef={fileRef}
            setfileRef={setfileRef}
            chat={chat}
            closeModal={() => setFileToUpload("")}
            mediaType={mediaTypeTobeUpload}
            fileToUpload={fileToUpload}
            handleSubmitMessage={handleSubmitMessage}
            setChat={setChat}
          />
        </div>
      )}
      {toggleAttachment && (
        <UploadFilePopUp
          openPollModal={() => {
            setPollModalOpen(true);
            setToggleAttachment(false);
          }}
          setfileRef={setfileRef}
          setFileToUpload={(value: string) => setFileToUpload(value)}
          setMediaTypeTobeUpload={(value: string) =>
            setMediaTypeTobeUpload(value)
          }
        />
      )}

      {/* {isVideoModalOpen && (
        <VideoCallModal
          remoteStreamvideo={remoteStreamvideo}
          localVideoStream={LocalStreamvideo}
          closeModal={() => dispatch(setVideoModalOpen(false))}
        />
      )} */}
    </section>
  );
}
