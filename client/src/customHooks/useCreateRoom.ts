import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axiosInstance";
import { ConversationType } from "../../../backend/models/Conversation";
import { toast } from "react-toastify";

export const useCreateConversationMutation = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (payload: ConversationType) => {
      return axiosInstance.post("/api/chatroom/createRoom", { payload });
    },
    onSuccess: () => {
      toast.success("Conversation room created");
    },
    onError: () => {
      toast.success("Conversation room fail");
    },
  });

  return { mutate, isPending, isError, error, isSuccess };
};
