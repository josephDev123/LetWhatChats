import moment from "moment";
import { MessageChatType } from "../../../type/ChatDataDTO";

type IncomingMessageType = {
  item: MessageChatType;
};

export default function IncomingMessage({ item }: IncomingMessageType) {
  return (
    // <section className="w-full flex bg-yellow-400">
    <div className="flex flex-col  leading-tight text-sm sm:w-[40%] w-[80%] rounded-l-md p-2 rounded-br-md bg-black/30">
      {item.imgUrl ? (
        <>
          <h3 className="mb-1 text-green-400">{item.from_UserDetails.name}</h3>
          <img
            src={item.imgUrl}
            alt="caption image"
            className="h-72 object-cover w-full"
          />
          <p className="mt-1 text-base">{item.message_text}</p>
          <span className="self-end">
            {moment(item.sent_datetime).format("HH:s")}
          </span>
        </>
      ) : (
        <>
          <h3>{item.from_UserDetails.name}</h3>
          <p>{item.message_text}</p>
          <span className="self-end">
            {moment(item.sent_datetime).format("HH:s")}
          </span>
        </>
      )}
    </div>
    // </section>
  );
}
