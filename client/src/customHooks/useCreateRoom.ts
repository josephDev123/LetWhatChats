import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-toastify";
import { ConversationDTO } from "../type/ConversationDTO";

export const useCreateConversationMutation = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (payload: ConversationDTO) => {
      return axiosInstance.post("room/create", { payload });
    },
    onSuccess: () => {
      toast.success("Conversation room created");
    },
    onError: () => {
      toast.error("Create Conversation room  fail");
    },
  });

  return { mutate, isPending, isError, error, isSuccess };
};
