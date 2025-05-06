import IncomingMessage from "./components/IncomingMessage";
import { GrEmoji } from "react-icons/gr";
import { GrFormAttachment } from "react-icons/gr";
import UploadFilePopUp from "./components/UploadFilePopUp";
import { FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import style from "../../styles/mobile_bg.module.css";
import Emojipicker from "../../generic/EmojiPicker";
import { FaSpinner } from "react-icons/fa6";
import PollingModal from "../../generic/PollingModal";
import { MdOutlineJoinInner } from "react-icons/md";
import MediaViewModal from "./components/MediaViewModal";
import { useQueryFacade } from "../../utils/GetConversationFacade";
import { ChatDataDTOType, MessageChatType } from "../../type/ChatDataDTO";
import { useParams } from "react-router-dom";
import { ChatbroadCastDataDTOType } from "../../type/ChatbroadcastDataDTOType";
import { toast } from "react-toastify";
import { handleSocketDisconnect } from "../../utils/socketDisconnect";

export default function ChatById() {
  const [toggleAttachment, setToggleAttachment] = useState(false);
  const [message, setMessage] = useState<MessageChatType[]>([]);
  const [isPollModalOpen, setPollModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<string | null>(null);

  const [fileRef, setfileRef] = useState("");
  const [mediaTypeTobeUpload, setMediaTypeTobeUpload] = useState("");
  const [isEmojiModalOpen, setisEmojiModalOpen] = useState(false);
  const [chat, setChat] = useState("");
  const user = useUser();
  // console.log(user);
  const { conversationId } = useParams();
  // const isVideoModalOpen = useSelector(
  //   (state: chatOrgType) => state.isVideoModalOpen
  // );

  const welcomeRef = useRef<HTMLDivElement>(null);

  socket.on("connect", () => {
    console.log(socket.id);
  });

  const chatData = useQueryFacade<ChatDataDTOType, Error>(
    ["chats", conversationId],
    `chat/find?conversation_id=${conversationId}`
  );

  const ConversationRoomName =
    chatData.data?.groupDetails.conversation_name || "";

  const conversation_members = chatData.data?.groupDetails.UserDetails || [];

  const conversationDisplayMembers = conversation_members
    .map((item) => item.name.split(" ")[0])
    .join(", ");

  useEffect(() => {
    setMessage(chatData.data?.messages || []);
  }, [chatData.data?.messages]);

  useEffect(() => {
    // Join the room
    // socket.emit("joinConversation", { conversationId });

    // // Listen for events
    // socket.once("joinConversation", (data) => {
    //   console.log(data);
    //   toast.success("Conversation establish successfully");
    // });

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      console.log(message);
      setMessage((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("joinConversation");
      socket.off("receiveMessage");
    };
  }, [conversationId]);

  function handleSubmitMessage(e?: FormEvent) {
    e?.preventDefault();
    const form = e?.target as HTMLFormElement;
    const formData = new FormData(form);
    const chatText = (formData.get("message") as string) || chat;
    if (!chatText) return "oloti";
    console.log(chatText);
    const payload: ChatbroadCastDataDTOType = {
      message_text: chatText,
      from_userId: user.data?._id,
      message_type: "text",
      imgUrl: fileToUpload || "",
      conversation_id: conversationId || "",
      from_UserDetails: { ...user.data, __v: 0 },
    };

    socket.emit("sendMessage", { conversationId, message: payload });
    form.reset();
  }

  handleSocketDisconnect(socket);

  return (
    <section
      className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar ${style.backgroundImageContainer}`}
    >
      <div className="flex justify-between items-center py-2 px-4 bg-black/40">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 flex items-center rounded-full hover:">
            {!ConversationRoomName ? (
              <div className="inline-flex ">
                <span className="">
                  <img
                    src={chatData.data?.groupDetails.UserDetails[0].profile_img}
                    alt=" avatar"
                    title={chatData.data?.groupDetails.UserDetails[0].name}
                    width={6}
                    height={6}
                    loading="lazy"
                    className="w-6 h-6 rounded-full border border-black"
                  />
                </span>

                <span className="translate-x-[-12px]">
                  <img
                    src={chatData.data?.groupDetails.UserDetails[1].profile_img}
                    alt=" avatar"
                    title={chatData.data?.groupDetails.UserDetails[1].name}
                    width={6}
                    height={6}
                    loading="lazy"
                    className="w-6 h-6 rounded-full border border-black"
                  />
                </span>
              </div>
            ) : (
              <img
                src={"https://avatars.dicebear.com/api/human/123.svg"}
                alt="avatar"
                loading="lazy"
                className="rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col leading-tight text-white/80">
            <h5 className="font-bold text-sm sm:text-base">
              {ConversationRoomName}
            </h5>
            <p className="text-sm sm:text-base ">
              <div className="flex justify-between gap-2 items-center">
                {conversationDisplayMembers}
              </div>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* <HiOutlineVideoCamera
          onClick={handleOpenVideoCall}
            className="text-white text-3xl  hover:bg-gray-50/25 rounded-md p-1 cursor-not-allowed"
          /> */}

          <MdOutlineJoinInner
            // onClick={HandleJoinedVideoCall}
            className="text-white text-3xl cursor-pointer hover:bg-gray-50/25 rounded-md p-1"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:px-4 px-1 text-white/80 pt-8 mb-2">
        <div ref={welcomeRef}></div>

        {chatData.isLoading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin h-8 w-8 text-white text-center" />
          </div>
        ) : chatData.isError ? (
          <span className="text-sm text-red-400">Something went wrong ..</span>
        ) : (
          <>
            {message.map((item, i) => (
              <div
                key={i}
                className={`flex w-full ${
                  item.from_userId === user.data?._id
                    ? "justify-end"
                    : "justify-start"
                } gap-2`}
              >
                <IncomingMessage item={item} />
              </div>
            ))}
          </>
        )}
      </div>

      <div
        // sticky bottom-0
        className={`sticky bottom-0 sm:text-white/80 text-black/50 font-semibold flex sm:gap-4 gap-2 mt-auto items-center py-2 sm:px-4 px-2 bg-black/40`}
      >
        <GrEmoji
          onClick={() => setisEmojiModalOpen((prev) => !prev)}
          className="hover:bg-black/30 p-1 rounded-md sm:text-3xl text-5xl cursor-pointer"
        />
        <GrFormAttachment
          onClick={() => setToggleAttachment((prev) => !prev)}
          className="hover:bg-black/30 p-1 rounded-md sm:text-3xl text-5xl cursor-pointer"
        />
        <form
          onSubmit={handleSubmitMessage}
          className="flex justify-between w-full bg-transparent"
        >
          <input
            disabled={fileToUpload ? true : false}
            onChange={(e) => setChat(e.target.value)}
            type="text"
            // value={chat}
            name="message"
            placeholder="Type a message"
            className="bg-transparent placeholder:text-white/60 w-full focus:outline-none "
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {/* modals */}
      {isEmojiModalOpen && (
        <span className="absolute sm:bottom-12 bottom-16">
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
            closeModal={() => setFileToUpload(null)}
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
