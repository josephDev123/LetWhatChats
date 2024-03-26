import { VscSend } from "react-icons/vsc";

export default function PollingModal() {
  return (
    <section className="rounded-md flex flex-col bg-black p-6 w-[400px]">
      <h3 className="text-white text-xl">Create a poll</h3>
      <h4 className="text-white mt-4">Question</h4>
      <input
        type="text"
        className="my-2 bg-gray-50/25 focus:border-b border-green-400 outline-none p-1 rounded-sm"
        placeholder="Type poll question"
      />
      <h4 className="text-white mb-1">Options</h4>
      <div className="flex flex-col border border-gray-200 rounded-sm px-1">
        <input
          type="text"
          placeholder="Type poll question"
          className="my-2 bg-gray-50/25 focus:border-b border-green-400 outline-none p-1 rounded-sm placeholder:text-white/50"
        />

        <input
          type="text"
          placeholder="Type poll question"
          className="my-2 bg-gray-50/25 focus:border-b border-green-400 outline-none p-1 rounded-sm placeholder:text-white/50"
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <input
          type="checkbox"
          name=""
          id=""
          className="accent-green-700 h-4 w-4 bg-black"
        />
        <p className="text-white">Allow multiple answers</p>
      </div>

      <div className="flex justify-end p-4 bg-black">
        <VscSend className="text-3xl bg-green-400 p-2 rounded-sm cursor-pointer" />
      </div>
    </section>
  );
}
