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
import { setVideoModalOpen } from "../../lib/redux/slices/slice";
import { chatOrgType } from "../../lib/redux/slices/slice";
import { MdOutlineJoinInner } from "react-icons/md";
import Calls from "../Calls";
import MediaViewModal from "./components/MediaViewModal";

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
  // console.log(message);
  const unique_channelMember = Array.from(
    new Set(message.map((item) => JSON.stringify(item.name)))
  ).map((item) => JSON.parse(item));
  const channel_members = unique_channelMember.splice(0, 3);
  const [messageStatus, setmessageStatus] = useState("idle");
  const [isPollModalOpen, setPollModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState("");
  const [fileRef, setfileRef] = useState("");
  const [mediaTypeTobeUpload, setMediaTypeTobeUpload] = useState("");
  const [isEmojiModalOpen, setisEmojiModalOpen] = useState(false);
  const [LocalStreamvideo, setLocalStreamvideo] = useState<MediaStream | null>(
    null
  );
  const [remoteStreamvideo, setRemoteStreamvideo] =
    useState<MediaStream | null>(null);
  // const [isVideoCallModalOpen, setisVideoCallModalOpen] = useState(false);
  // console.log("remote: " + remoteStreamvideo, "local :" + LocalStreamvideo);
  const isVideoModalOpen = useSelector(
    (state: chatOrgType) => state.isVideoModalOpen
  );
  const dispatch = useDispatch();
  const roomCredential = useSelector(
    (state: chatAppType) => state.roomCredential
  );

  let peerConnection = useRef<RTCPeerConnection | null>(null);

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
    socket.on("answer", handlePeerMessage);
    socket.on("offer", handlePeerMessage);
    socket.on("iceCandidate", handlePeerMessage);

    return () => {
      socket.off("welcomeMessage", handleWelcomeMessage);
      socket.off("exchangeMessage", handleExchangeMessage);
      socket.off("listenToCreatePoll", handlePollMessage);
      socket.off("answer", handlePeerMessage);
      socket.off("offer", handlePeerMessage);
      socket.off("iceCandidate", handlePeerMessage);
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
      img: fileToUpload,
    });
    setChat("");
  }

  const createPeerConnection = async () => {
    if (!peerConnection.current) {
      peerConnection.current = new RTCPeerConnection(servers);

      const videoObj = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setLocalStreamvideo(videoObj);

      videoObj?.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, videoObj);
      });

      peerConnection.current.ontrack = (event) => {
        console.log("stream");
        const remoteStream = new MediaStream();
        event.streams[0].getTracks().forEach((track) => {
          remoteStream?.addTrack(track);
        });
        setRemoteStreamvideo(remoteStream);
      };

      peerConnection.current.onicecandidate = async (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate", event.candidate);
          socket.emit("iceCandidate", {
            type: "candidate",
            candidate: event.candidate,
          });
        }
      };
    }
  };

  async function handleOpenVideoCall() {
    try {
      await createPeerConnection();
      // socket.on("answer", handlePeerMessage);
      // socket.on("offer", handlePeerMessage);
      // socket.on("iceCandidate", handlePeerMessage);
      const videoObj = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoObj) {
        // console.log(videoObj);
        setLocalStreamvideo(videoObj);
        // dispatch(setVideoModalOpen(true));
      }

      //create offer
      await createOffer();
    } catch (error) {
      console.log(error);
    }
  }

  const handlePeerMessage = async (data: any) => {
    console.log(data);
    switch (data.type) {
      case "offer":
        await createAnswer(data.offer);
        break;
      case "answer":
        await addAnswer(data.answer);
        break;
      case "candidate":
        if (peerConnection.current) {
          console.log("adding icecandidate");
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
        break;
      default:
        break;
    }
  };

  const createOffer = async () => {
    if (peerConnection.current) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { type: "offer", offer });
    }
  };

  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    await createPeerConnection();
    if (peerConnection.current) {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { type: "answer", answer });
    }
  };

  const addAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) {
      console.error("Peer connection is not initialized.");
      return;
    }

    if (peerConnection.current.signalingState === "stable") {
      console.warn("Cannot set remote answer in stable state.");
      return;
    }

    try {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      console.error("Error setting remote answer:", error);
    }
  };

  // console.log(message);
  let localvideoRef = useRef<HTMLVideoElement | null>(null);
  let remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (localvideoRef.current && LocalStreamvideo) {
      localvideoRef.current.srcObject = LocalStreamvideo;
      localvideoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    if (remoteVideoRef.current && remoteStreamvideo) {
      remoteVideoRef.current.srcObject = remoteStreamvideo;
      remoteVideoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [LocalStreamvideo, remoteStreamvideo]);

  return (
    <section
      className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar ${style.backgroundImageContainer}`}
    >
      {/* <div className="grid grid-cols-2">
        <video
          className="border p-1"
          ref={localvideoRef}
          width={600}
          height={400}
          autoPlay
          playsInline
          muted
        />

        <video
          className="border p-1"
          ref={remoteVideoRef}
          width={600}
          height={400}
          autoPlay
          playsInline
          muted
        />
      </div> */}
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
        <div className="flex items-center gap-1">
          <HiOutlineVideoCamera
            onClick={handleOpenVideoCall}
            className="text-white text-3xl cursor-pointer hover:bg-gray-50/25 rounded-md p-1"
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
