import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type PromiseAction = (args: any) => Promise<any>;
type CallbackFunction = (data?: any, error?: any) => void;

export const useCreateMutation = (
  PromiseAction: PromiseAction,
  callback?: CallbackFunction
) => {
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: PromiseAction,
    onSuccess: (data) => {
      console.log("Success:", data);
      toast.success("Conversation created successfully");
      if (callback) callback(data);
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error(error.message);

      if (callback) callback(undefined, error);
    },
  });

  // Return the mutation state and function to trigger it
  return { mutate, isPending, isError, error, isSuccess, data };
};
