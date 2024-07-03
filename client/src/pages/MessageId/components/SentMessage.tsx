import { ChatDataType } from "../../../type/chatDataType";

type SentMessageType = {
  item: ChatDataType;
};

export default function SentMessage({ item }: SentMessageType) {
  console.log(item);
  return (
    <section className="w-full flex justify-end ">
      <div className="flex flex-col leading-tight text-sm sm:w-[40%] w-[80%] rounded-r-md p-2 rounded-bl-md bg-black/30">
        {item.img ? (
          <>
            <img
              src={item.img}
              alt="caption image"
              className="h-72 object-cover w-full"
            />
            <p className="mt-1 text-base">{item.chat}</p>
            <span className="self-end">{item.time}</span>
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
