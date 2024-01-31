import { ChatDataType } from "../../type/chatDataType";

type SentMessageType = {
  item: ChatDataType;
};

export default function SentMessage({ item }: SentMessageType) {
  return (
    <section className="w-full flex justify-end ">
      <div className="flex flex-col leading-tight text-sm w-[40%] rounded-r-md p-2 rounded-bl-md bg-black/30">
        <h3>{item.name}</h3>
        <p>Sent Message ;{item.chat}</p>
        <span className="self-end">{item.time}</span>
      </div>
    </section>
  );
}
