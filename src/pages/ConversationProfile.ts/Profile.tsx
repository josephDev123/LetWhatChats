import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegPenToSquare, FaSpinner } from "react-icons/fa6";
import ConversationProfileSchema, {
  conversationProfileSchemaType,
} from "../../zodTypes/conversationProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
// import { useQueryFacade } from "../../utils/GetConversationFacade";
// import { ConversationType } from "../../type/dbConversationType";
import { ConversationPayload } from "../../type/ConversationProfile";
import { Images } from "../../../Images";
import { useQueryFacade } from "../../utils/GetConversationFacade";
import { ConversationType } from "../../type/dbConversationType";
import { useUploadFirebaseToFirebase } from "../../customHooks/useUploadToFirebase";
import { useGeneralMutation } from "../../utils/useMutationFacade";
import { toast } from "react-toastify";

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
  const { downloadedUrl, errorMsg, uploadStageStatus, uploadFile } =
    useUploadFirebaseToFirebase();

  const fileRef = useRef<HTMLInputElement>(null!);
  const { conversationId } = useParams();
  const conversation = useQueryFacade<ConversationType[], Error>(
    ["conversations_profile", conversationId],
    `/conversation/${conversationId}`
  );

  const { mutateAsync, isPending } = useGeneralMutation<
    conversationProfileType,
    ConversationPayload
  >("put", "conversation/update-group");

  const data = conversation.data as ConversationType[];

  useEffect(() => {
    if (data?.length > 0) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: data?.[0]?.avatar || prevProfile.avatar,
        conversation_name:
          data?.[0]?.conversation_name || prevProfile.conversation_name,
      }));
    }
  }, [data]);

  const {
    handleSubmit,
    register,
    reset,
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
      uploadFile("conversation_avatar", file);
    }
  };

  const handleSaveConversationProfile: SubmitHandler<
    conversationProfileSchemaType
  > = (data) => {
    console.log(data);
    const payload: ConversationPayload = {
      avatar: downloadedUrl,
      conversation_id: conversationId!,
      conversation_name: data.conversationName,
    };

    mutateAsync(payload, {
      onSuccess: (data) => {
        console.log("coming from db", data);
        setProfile({
          avatar: data?.avatar || "",
          conversation_name: data?.conversation_name || "",
          creator: "",
        });
        reset();
        toast.success("Conversation Info Updated");
      },
      onError: (error) => {
        console.error("Mutation failed", error);
        toast.error("Failed to update conversation info. Please try again.");
      },
    });
  };
  return (
    <section className="p-2 flex flex-col justify-center items-center text-white">
      <h1 className="font-medium">Conversation Profile</h1>
      {conversation.isError && (
        <p className="text-sm text-red-300 h-40 mt-6">
          Something went wrong. Check Your Network or Refresh
        </p>
      )}

      {conversation.isLoading && (
        <div className=" flex flex-col justify-center items-center h-40">
          <FaSpinner className="animate-spin h-8 w-8" />
        </div>
      )}
      {data?.length > 0 && (
        <>
          <div className="relative mt-4">
            <img
              loading="lazy"
              src={profile.avatar || Images.avatar_one}
              alt="conversation avatar"
              className=" w-20 h-20 rounded-full object-cover border border-white"
            />

            <FaRegPenToSquare
              onClick={() => fileRef?.current.click()}
              className="text-white bg-black p-1 rounded-md text-lg cursor-pointer absolute right-0 top-14 drop-shadow-md"
            />
          </div>

          <small className="text-red-300">{errorMsg && errorMsg}</small>
          <small className="text-green-300">
            {uploadStageStatus && uploadStageStatus}
          </small>
          {/* <p className="mt-3">
            <b>Creator:</b> {""}
          </p> */}
          <p className="mb-2">
            <b>Conversation name:</b> {profile.conversation_name}
          </p>
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handleFileChange}
            id=""
            accept="image/*"
          />
          <form onSubmit={handleSubmit(handleSaveConversationProfile)}>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
              <div className="flex flex-col">
                <input
                  type="text"
                  {...register("conversationName")}
                  placeholder="Conversation name"
                  // defaultValue={profile.conversation_name}
                  className="p-2 rounded-md outline-none text-black border"
                />
                {errors.conversationName && (
                  <small className="text-red-400 mt-1">
                    {errors.conversationName.message}
                  </small>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending || Boolean(uploadStageStatus)}
                className="inline-flex justify-center items-center  gap-1 bg-green-400 rounded-md h-fit p-2"
              >
                Save{" "}
                {isPending && <FaSpinner className="animate-spin h-5 w-5" />}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}

// 1. upload avatar
// 2. change room name
// 3.
