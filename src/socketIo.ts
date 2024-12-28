import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  // process.env.NODE_ENV === "production"
  //   ? import.meta.env.VITE_BASEURL
  import.meta.env.VITE_BASEURL;

export const socket = io(URL!);

// export const socket = io("http://localhost:7000");
