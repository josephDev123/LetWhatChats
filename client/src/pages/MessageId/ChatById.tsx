import { useParams } from "react-router-dom";
import IncomingMessage from "../../components/messageId/IncomingMessage";
import SentMessage from "../../components/messageId/SentMessage";
import { GrEmoji } from "react-icons/gr";
import { GrFormAttachment } from "react-icons/gr";
import UploadFilePopUp from "../../components/messageId/UploadFilePopUp";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import moment from "moment";
import { ChatDataType } from "../../type/chatDataType";
import style from "../../styles/mobile_bg.module.css";
import Emojipicker from "../../components/generic/EmojiPicker";
import { useSelector } from "react-redux";
import { chatAppType } from "../../sliceType";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
import PollingModal from "../../components/generic/PollingModal";

export default function ChatById() {
  const [toggleAttachment, setToggleAttachment] = useState(false);
  const [message, setMessage] = useState<ChatDataType[]>([]);
  const unique_channelMember = Array.from(
    new Set(message.map((item) => JSON.stringify(item.name)))
  ).map((item) => JSON.parse(item));
  const channel_members = unique_channelMember.splice(0, 3);

  console.log(unique_channelMember);
  const [messageStatus, setmessageStatus] = useState("idle");
  const [isPollModalOpen, setPollModalOpen] = useState(false);
  console.log(isPollModalOpen);
  const [isEmojiModalOpen, setisEmojiModalOpen] = useState(false);
  const roomCredential = useSelector(
    (state: chatAppType) => state.roomCredential
  );

  const welcomeRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState("");
  const { room } = useParams();
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
      console.log("socket message: " + message);
    }
    socket.on("welcomeMessage", handleWelcomeMessage);
    // Handle incoming chat messages
    socket.on("exchangeMessage", handleExchangeMessage);

    return () => {
      socket.off("welcomeMessage", handleWelcomeMessage);
      socket.off("exchangeMessage", handleExchangeMessage);
    };
  }, []);

  const getMessage = async () => {
    setmessageStatus("loading");
    try {
      const res = await axios.get(`http://localhost:7000/chat/message/${room}`);
      const result = res.data;
      setMessage(result.data);
      setmessageStatus("data");
    } catch (error) {
      setmessageStatus("error");
      console.log(error);
    }
  };

  useEffect(() => {
    const callMessage = getMessage();
    return () => {
      callMessage;
    };
  }, []);

  function handleSubmitMessage(e: FormEvent) {
    e.preventDefault();
    // console.log(user.data.name, room, chat);
    socket.emit("submitMessage", {
      name: user.data.name,
      room,
      chat,
      time: moment(new Date()).format("h:mm"),
    });
    setChat("");
  }
  console.log(message);
  return (
    <section
      className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar ${style.backgroundImageContainer}`}
    >
      <div className="flex gap-2 items-center py-2 px-4 bg-black/40">
        <div className="sm:w-12 sm:h-12 h-10 w-10 rounded-full hover:">
          <img
            src={roomCredential.avatar}
            alt="avatar"
            loading="lazy"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col leading-tight text-white/80">
          <h5 className="font-bold text-sm sm:text-base">{room}</h5>
          <p className="text-sm sm:text-base ">
            {/* breteke, garri, juwon, mercy, joshua */}
            <div className="flex justify-between gap-2 items-center">
              {channel_members.map((item, index) => (
                <p key={index}>{item},</p>
              ))}
            </div>
          </p>
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
              .filter((itemRoom) => itemRoom.room === room)
              .map((item, i) => (
                <Fragment key={i}>
                  {item.name !== user.data.name ? (
                    <IncomingMessage item={item} />
                  ) : (
                    <SentMessage item={item} />
                  )}
                </Fragment>
              ))}
          </>
        )}
      </div>

      <div className="relative sticky bottom-0  sm:text-white/80 text-black/50 font-semibold flex gap-4 mt-auto items-center py-2 px-4 bg-black/40">
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
          <PollingModal />
        </span>
      )}
      {toggleAttachment && (
        <UploadFilePopUp
          openPollModal={() => {
            setPollModalOpen(true);
            setToggleAttachment(false);
          }}
        />
      )}
    </section>
  );
}
