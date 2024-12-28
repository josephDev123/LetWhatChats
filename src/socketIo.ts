import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_BASEURL;

export const socket = io(URL!);
