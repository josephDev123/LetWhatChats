// import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

export default function Index() {
  return (
    <section className="flex flex-col h-full items-center justify-around sm:text-white text-green-500">
      {/* <IoChatboxEllipsesOutline className="text-8xl" /> */}
      <img
        src="./logoNoBg.png"
        alt="logo"
        className="text-8xl h-36 w-36 rounded-md"
      />
      <div className="flex flex-col items-center justify-center text-lg ">
        <p className="sm:text-gray-300 text-black">From</p>
        <span className="flex items-center gap-2 ">
          <LuPencilLine />
          LetWhatChat
        </span>
      </div>
    </section>
  );
}
