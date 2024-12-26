import moment from "moment";
import { MessageChatType } from "../../../type/ChatDataDTO";

type IncomingMessageType = {
  item: MessageChatType;
};

export default function IncomingMessage({ item }: IncomingMessageType) {
  return (
    <section className="flex gap-2">
      <img
        src={item.from_UserDetails.profile_img}
        alt="caption image"
        className="h-8 w-8 object-contain rounded-full border border-white"
      />
      <div className="flex flex-col w-full leading-tight text-sm sm:w-72 rounded-l-md p-2 rounded-br-md bg-black/30">
        {item.imgUrl ? (
          <>
            <h3 className="mb-1 text-green-400">
              {item.from_UserDetails.name}
            </h3>
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
    </section>
  );
}
