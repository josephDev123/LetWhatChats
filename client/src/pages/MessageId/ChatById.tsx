import { useParams } from "react-router-dom";
import { Images } from "../../../Images";
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

export default function ChatById() {
  const [toggleAttachment, setToggleAttachment] = useState(false);
  const [message, setMessage] = useState<ChatDataType[]>([]);
  console.log(message);
  const welcomeRef = useRef<HTMLDivElement>(null);
  // const [socket, setSocket] = useState<any>();
  const [chat, setChat] = useState("");
  const { room } = useParams();
  const user = useUser();

  // useEffect(() => {
  // const newSocket = io("http://localhost:7000/");
  // setSocket(newSocket);
  function onConnect() {
    socket.emit("welcomeMessage", { room });
    console.log("client connected");
  }

  function disConnect() {
    console.log("client disconnected");
  }

  socket.on("connect", onConnect);

  socket.on("disconnect", disConnect);

  // socket.emit("joinRoom", room);

  // return () => {
  // socket.off("connect", onConnect);
  // socket.off("disconnect", disConnect);
  //   };
  // }, [room]);

  socket.on("connect_error", (error: any) => {
    console.error("Connection error:", error);
  });

  // useEffect(() => {
  socket.on("welcomeMessage", (data) => {
    // console.log(data);
    if (welcomeRef.current) {
      welcomeRef.current.innerHTML = data;
    }
  });
  // }, []);

  function handleSubmitMessage(e: FormEvent) {
    e.preventDefault();
    // if ((e as React.KeyboardEvent).key === "Enter") {

    // }

    socket.emit("submitMessage", {
      name: user.data.name,
      room,
      chat,
      time: moment(new Date()).format("h:mm"),
    });
  }

  // useEffect(() => {
  if (socket) {
    // Handle incoming chat messages
    socket.on("exchangeMessage", (chat) => {
      console.log(chat);
      setMessage([...message, chat]);
    });
  }
  // }, [socket]);

  return (
    <section
      className={`flex flex-col w-full h-full ${style.backgroundImageContainer}`}
    >
      <div className="flex gap-2 items-center py-2 px-4 bg-black/40">
        <div className="sm:w-12 sm:h-12 h-10 w-10 rounded-full hover:">
          <img src={Images.avatar_one_png} alt="" />
        </div>
        <div className="flex flex-col leading-tight text-white/80">
          <h5 className="font-bold text-sm sm:text-base ">{room}</h5>
          <p className="text-sm sm:text-base ">
            breteke, garri, juwon, mercy, joshua
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 px-4 text-white/80 pt-8">
        <div ref={welcomeRef}></div>

        {message.map((item, i) => (
          // <span key={i}>{item}</span>
          <Fragment key={i}>
            {item.name !== user.data.name ? (
              <IncomingMessage item={item} />
            ) : (
              <SentMessage item={item} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="relative sm:text-white/80 text-black/50 font-semibold flex gap-4 mt-auto items-center py-2 px-4 bg-black/40">
        <GrEmoji className="hover:bg-black/30 p-1 rounded-md text-3xl cursor-pointer" />
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
            placeholder="Type a message"
            className="bg-transparent placeholder:text-black/50 w-full focus:outline-none"
          />
          <button type="submit">Send</button>
        </form>
      </div>

      {toggleAttachment && <UploadFilePopUp />}
    </section>
  );
}
