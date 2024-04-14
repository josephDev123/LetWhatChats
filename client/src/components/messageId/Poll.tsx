import { IoCheckmarkCircle } from "react-icons/io5";
import { ChatDataType, pollType } from "../../type/chatDataType";
import moment from "moment";
import { socket } from "../../socketIo";
import { useUser } from "../../customHooks/useUser";
import { SetStateAction, useEffect } from "react";
import { errorAlert } from "../../utils/errorAlert";

interface PollProps {
  className?: string;
  item: pollType;
  chat: ChatDataType[];
  setChat: React.Dispatch<SetStateAction<ChatDataType[]>>;
}

export default function Poll({ className, item, chat, setChat }: PollProps) {
  const user = useUser();
  // console.log(item);
  function handleVote(whatToUpdateId: string) {
    if (item.peopleWhovoted.includes(user.data.email)) {
      return errorAlert("You can't unvote and revote again. you vote once");
    } else {
      socket.emit("onVoted", {
        chats: chat,
        whatToUpdateId: whatToUpdateId,
        item: item,
        user: user.data.email,
      });
    }
  }

  useEffect(() => {
    const handleListenToVote = (data: ChatDataType[]) => {
      console.log(data);
      setChat(data);
    };
    socket.on("listToOnVoted", handleListenToVote);

    return () => {
      socket.on("off", handleListenToVote);
    };
  }, []);
  return (
    <section
      className={`flex flex-col space-y-2 bg-black/30 sm:w-[40%] w-[80%] rounded-l-md p-2 rounded-br-md ${className}`}
    >
      <h2 className="font-bold">{item.question}</h2>
      <div className="flex gap-3 items-center">
        <span className="flex items-center">
          <IoCheckmarkCircle className="z-10" />
          <IoCheckmarkCircle className="-translate-x-1 z-40" />
        </span>
        Select one or more
      </div>

      <div className="flex flex-col gap-1">
        {item.options.map((pollItem, i) => (
          <div key={i} className="flex gap-2">
            <input
              onChange={() => handleVote(pollItem._id)}
              type="checkbox"
              className={`accent-green-700 rounded-full h-4 w-4 mt-1 ${
                item.peopleWhovoted.includes(user.data.email)
                  ? "cursor-not-allowed"
                  : "cursor-pointer "
              }`}
              name=""
              id=""
              disabled={
                item.peopleWhovoted.includes(user.data.email) ? true : false
              }
            />
            <div className="flex flex-col space-y-2 w-full">
              <span className="flex justify-between items-center text-sm">
                <h5>{pollItem.option}</h5>
                {pollItem?.count === undefined ? "" : pollItem.count}
              </span>

              <progress
                className="w-full h-3 bg-green-500"
                value={pollItem.count}
                max={500}
              ></progress>
            </div>
          </div>
        ))}

        <span className="text-xs text-end">
          {!item.createdAt ? "" : moment(item.createdAt).format("hh:m")}
        </span>
      </div>
    </section>
  );
}
