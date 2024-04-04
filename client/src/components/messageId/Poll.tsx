import { IoCheckmarkCircle } from "react-icons/io5";
import { pollType } from "../../type/chatDataType";
import moment from "moment";

interface PollProps {
  className?: string;
  item: pollType;
}

export default function Poll({ className, item }: PollProps) {
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
        {item.options.map((item, i) => (
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="accent-green-700 cursor-pointer rounded-full h-4 w-4 mt-1"
              name=""
              id=""
            />
            <div className="flex flex-col space-y-2 w-full">
              <span className="flex justify-between items-center text-sm">
                <h5>{item.option}</h5>
                {item.count}
              </span>

              <input
                type="range"
                className="accent-green-400"
                min={0}
                max={100}
                name=""
                id=""
              />
            </div>
          </div>
        ))}

        <span className="text-xs text-end">
          {moment(item.createdAt).format("hh:m")}
        </span>
      </div>
    </section>
  );
}
