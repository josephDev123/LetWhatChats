import { useParams } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import { chatAppType } from "../../sliceType";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
import PollingModal from "../../generic/PollingModal";
import Poll from "./components/Poll";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { VideoCallModal } from "../VideoCall/VideoCallModal";
import { setVideoModalOpen } from "../../slice";
import { chatOrgType } from "../../slice";

export type Ioffer = {
  type: string;
  offer: RTCSessionDescriptionInit;
};

export type Ianswer = {
  type: string;
  answer: RTCSessionDescriptionInit;
};

export default function ChatById() {
  const [toggleAttachment, setToggleAttachment] = useState(false);
  const [message, setMessage] = useState<ChatDataType[]>([]);
  const unique_channelMember = Array.from(
    new Set(message.map((item) => JSON.stringify(item.name)))
  ).map((item) => JSON.parse(item));
  const channel_members = unique_channelMember.splice(0, 3);
  const [messageStatus, setmessageStatus] = useState("idle");
  const [isPollModalOpen, setPollModalOpen] = useState(false);
  const [isEmojiModalOpen, setisEmojiModalOpen] = useState(false);
  const [LocalStreamvideo, setLocalStreamvideo] = useState<MediaStream | null>(
    null
  );
  const [remoteStreamvideo, setRemoteStreamvideo] =
    useState<MediaStream | null>(null);
  // const [isVideoCallModalOpen, setisVideoCallModalOpen] = useState(false);

  const isVideoModalOpen = useSelector(
    (state: chatOrgType) => state.isVideoModalOpen
  );
  const dispatch = useDispatch();
  const roomCredential = useSelector(
    (state: chatAppType) => state.roomCredential
  );

  let peerConnection: RTCPeerConnection;

  const welcomeRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState("");
  const { room } = useParams();
  const user = useUser();

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

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
    socket.on("handshake", handlePeerMessage);

    return () => {
      socket.off("welcomeMessage", handleWelcomeMessage);
      socket.off("exchangeMessage", handleExchangeMessage);
      socket.off("listenToCreatePoll", handlePollMessage);
      socket.off("listenToCreatePoll", handlePeerMessage);
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

  const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(servers);
    setRemoteStreamvideo(new MediaStream());
    if (!LocalStreamvideo) {
      const videoObj = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setLocalStreamvideo(videoObj);
    }

    LocalStreamvideo?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, LocalStreamvideo);
    });

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("handshake", {
          type: "candidate",
          candidate: event.candidate,
          // memberId,
        });
      }
    };

    //create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    //emit the offer
    const offerData = {
      type: "offer",
      offer,
    };
    socket.emit("handShake", offerData);

    // peerConnection.ontrack = (event) => {
    //   if (!remoteStreamvideo) {
    //     setRemoteStreamvideo(new MediaStream());
    //   }
    //   remoteStreamvideo?.addTrack(event.track);
    // };
    peerConnection.ontrack = (event) => {
      console.log("stream", event);
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamvideo?.addTrack(track);
      });
    };
  };

  async function handleOpenVideoCall() {
    peerConnection = new RTCPeerConnection(servers);
    try {
      createPeerConnection();
      // const videoObj = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      // });
      // if (videoObj) {
      //   // console.log(videoObj);
      //   setLocalStreamvideo(videoObj);

      //   LocalStreamvideo?.getTracks().forEach((track) => {
      //     peerConnection.addTrack(track, LocalStreamvideo);
      //   });
      //   dispatch(setVideoModalOpen(true));
      // }
      // //listen for ice-candidate
      // peerConnection.onicecandidate = (event) => {
      //   if (event.candidate) {
      //     socket.emit("handshake", {
      //       type: "candidate",
      //       candidate: event.candidate,
      //     });
      //   }
      // };
      // //create offer
      // const offer = await peerConnection.createOffer();
      // await peerConnection.setLocalDescription(offer);
      // //emit the offer
      // const offerData = {
      //   type: "offer",
      //   offer,
      // };
      // socket.emit("handShake", offerData);

      // peerConnection.ontrack = (event) => {
      //   if (!remoteStreamvideo) {
      //     setRemoteStreamvideo(new MediaStream());
      //   }
      //   remoteStreamvideo?.addTrack(event.track);
      // };
    } catch (error) {
      console.log(error);
    }
  }

  const handlePeerMessage = (payload: any) => {
    const data = payload;
    if (data.type === "offer") {
      createAnswer(data.offer);
    }
    if (data.type === "answer") {
      addAnswer(data.answer);
    }

    if (data.type === "candidate") {
      if (peerConnection) {
        peerConnection.addIceCandidate(data.candidate);
      }
    }
  };

  async function createAnswer(offer: RTCSessionDescriptionInit) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    const answerData = { type: "answer", answer };
    socket.emit("handshake", answerData);
  }

  async function addAnswer(answer: RTCSessionDescriptionInit) {
    // if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
    // }
  }

  // console.log(message);
  return (
    <section
      className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar ${style.backgroundImageContainer}`}
    >
      <div className="flex justify-between items-center py-2 px-4 bg-black/40">
        <div className="flex  gap-2">
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
        <div>
          <HiOutlineVideoCamera
            onClick={handleOpenVideoCall}
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
              .filter((itemRoom) => itemRoom.room === room)
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
          <PollingModal closeModal={() => setPollModalOpen(false)} />
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

      {isVideoModalOpen && (
        <VideoCallModal
          localVideoStream={LocalStreamvideo}
          closeModal={() => dispatch(setVideoModalOpen(false))}
        />
      )}
    </section>
  );
}
