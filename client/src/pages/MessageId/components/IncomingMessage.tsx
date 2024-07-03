import { ChatDataType } from "../../../type/chatDataType";

type IncomingMessageType = {
  item: ChatDataType;
};

export default function IncomingMessage({ item }: IncomingMessageType) {
  return (
    <section className="w-full flex justify-start">
      <div className="flex flex-col leading-tight text-sm sm:w-[40%] w-[80%] rounded-l-md p-2 rounded-br-md bg-black/30">
        {item.img ? (
          <>
            <img src={item.img} alt="caption image" />
            <span className="flex justify-between items-center">
              <p>{item.chat}</p>
              <span>{item.time}</span>
            </span>
          </>
        ) : (
          <>
            <h3>{item.name}</h3>
            <p>Sent Message: {item.chat}</p>
            <span className="self-end">{item.time}</span>
          </>
        )}
      </div>
    </section>
  );
}
