import { IoIosPeople } from "react-icons/io";
import { LuPlusCircle } from "react-icons/lu";

export default function Community() {
  return (
    <section className="flex flex-col items-start">
      <div className="flex items-center gap-4 relative cursor-pointer">
        <IoIosPeople className="text-3xl p-1 bg-black/20 rounded-md " />
        <p className="font-semibold">New community</p>
        <LuPlusCircle color="green" className="absolute left-5 top-4 " />
      </div>
    </section>
  );
}
