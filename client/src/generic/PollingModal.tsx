import { SubmitHandler, useForm } from "react-hook-form";
import { VscSend } from "react-icons/vsc";
import { pollingType } from "../zodTypes/pollingdataType";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { socket } from "../socketIo";
import { useParams } from "react-router-dom";
import { useUser } from "../customHooks/useUser";

interface PollingModalProps {
  closeModal: () => void;
}
export default function PollingModal({ closeModal }: PollingModalProps) {
  type polling = z.infer<typeof pollingType>;
  const { room } = useParams();
  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<polling>({ resolver: zodResolver(pollingType) });

  const handleSubmitPoll: SubmitHandler<polling> = (data) => {
    socket.emit("createPoll", {
      ...data,
      type: "poll",
      room: room,
      user: user,
    });
    closeModal();
  };
  return (
    <section className="rounded-md flex flex-col bg-black p-6 w-[400px]">
      <h3 className="text-white text-xl">Create a poll</h3>
      <h4 className="text-white mt-4">Question</h4>
      <input
        type="text"
        {...register("question")}
        className="text-white my-2 bg-gray-50/25 focus:border-b border-green-400 outline-none p-1 rounded-sm"
        placeholder="Type poll question"
      />
      {errors.question && (
        <span className="text-xs text-red-400">{errors.question.message}</span>
      )}
      <h4 className="text-white mb-1">Options</h4>
      <div className="flex flex-col border border-gray-200 rounded-sm px-1">
        <input
          type="text"
          {...register("optionOne")}
          placeholder="Type poll question"
          className="text-white my-2 bg-gray-50/25 focus:border-b border-green-400 outline-none p-1 rounded-sm placeholder:text-white/50"
        />
        {errors.question && (
          <span className="text-xs text-red-400">
            {errors.optionOne?.message}
          </span>
        )}

        <input
          type="text"
          {...register("optionTwo")}
          placeholder="Type poll question"
          className="text-white my-2 bg-gray-50/25 focus:border-b border-green-400 outline-none p-1 rounded-sm placeholder:text-white/50"
        />
      </div>
      {errors.question && (
        <span className="text-xs text-red-400">
          {errors.optionTwo?.message}
        </span>
      )}

      <div className="flex items-center gap-3 mt-6">
        <input
          {...register("multipleAnswer")}
          type="checkbox"
          name=""
          id=""
          className="accent-green-700 h-4 w-4 bg-black"
        />
        <p className="text-white">Allow multiple answers</p>
      </div>
      {errors.question && (
        <span className="text-xs text-red-400">
          {errors.multipleAnswer?.message}
        </span>
      )}

      <div
        className="flex justify-end p-4 bg-black"
        onClick={handleSubmit(handleSubmitPoll)}
      >
        <VscSend className="text-4xl bg-green-400 p-2 rounded-sm cursor-pointer" />
      </div>
    </section>
  );
}
