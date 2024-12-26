import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

export const handleSocketDisconnect = (socket: Socket) => {
  socket.on("disconnect", (reason) => {
    if (
      reason === "transport close" ||
      reason === "ping timeout" ||
      reason === "transport error"
    ) {
      toast.error("Connection lost, please check your internet connection");
    }
  });
};
