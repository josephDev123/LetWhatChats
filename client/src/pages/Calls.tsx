import { MdOutlineInsertLink } from "react-icons/md";

export default function Calls() {
  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center gap-4 cursor-not-allowed">
        <MdOutlineInsertLink className="bg-green-500 rounded-full text-3xl p-1" />
        <div className="flex flex-col">
          <p className="font-semibold">Create call link</p>
          <p className="text-sm text-slate-400">
            Share a link for your JoeWhatChat call
          </p>
        </div>
      </div>
    </section>
  );
}
