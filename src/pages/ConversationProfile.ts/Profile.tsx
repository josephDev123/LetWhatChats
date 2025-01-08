import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegPenToSquare } from "react-icons/fa6";
import ConversationProfileSchema, {
  conversationProfileSchemaType,
} from "../../zodTypes/conversationProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
// import { useQueryFacade } from "../../utils/GetConversationFacade";
// import { ConversationType } from "../../type/dbConversationType";
import { ConversationPayload } from "../../type/ConversationProfile";
import { Images } from "../../../Images";

type conversationProfileType = {
  conversation_name: string;
  avatar: string;
  creator: string;
};
export default function ConversationProfile() {
  const [profile, setProfile] = useState<conversationProfileType>({
    avatar: "",
    conversation_name: "",
    creator: "",
  });
  const fileRef = useRef<HTMLInputElement>(null!);
  const { conversationId } = useParams();
  // const conversations = useQueryFacade<ConversationType[], Error>(
  //   ["conversations_id"],
  //   ""
  // );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<conversationProfileSchemaType>({
    resolver: zodResolver(ConversationProfileSchema),
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    // console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const objectUrl = String(reader.result);
        setProfile((prev) => ({ ...prev, avatar: objectUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveConversationProfile: SubmitHandler<
    conversationProfileSchemaType
  > = (data) => {
    console.log(data);
    const payload: ConversationPayload = {
      avatar: "",
      conversation_id: conversationId!,
      conversation_name: data.conversationName,
    };
    alert("implementation ongoing");
    console.log(payload);
  };
  return (
    <section className="p-2 flex flex-col justify-center items-center text-white">
      <h1 className="font-medium">Conversation Profile</h1>
      <div className="relative mt-4">
        <img
          src={profile.avatar || Images.avatar_one}
          alt="conversation avatar"
          className=" w-20 h-20 rounded-full object-cover"
        />

        <FaRegPenToSquare
          onClick={() => fileRef?.current.click()}
          className="text-white bg-black p-1 rounded-md text-lg cursor-pointer absolute right-0 top-14 drop-shadow-md"
        />
      </div>
      <p className="my-3">Creator: Joe</p>
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange}
        id=""
        accept="image/*"
      />
      <form onSubmit={handleSubmit(handleSaveConversationProfile)}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <input
              type="text"
              {...register("conversationName")}
              placeholder="Conversation name"
              defaultValue={profile.conversation_name}
              className="p-2 rounded-md outline-none text-black"
            />
            {errors.conversationName && (
              <small className="text-red-400 mt-1">
                {errors.conversationName.message}
              </small>
            )}
          </div>

          <button type="submit" className="bg-green-400 rounded-md h-fit p-2">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

// 1. upload avatar
// 2. change room name
// 3.
