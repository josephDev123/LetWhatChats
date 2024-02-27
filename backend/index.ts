import express, { Express, Request, Response, NextFunction } from "express";
import { dbConnection } from "./db";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRoute } from "./routes/auths/authRoute";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middleware/authenticateToken";
import { Server } from "socket.io";
import { createServer } from "http";
import { User } from "./utils/User";
import { chatRoomModel } from "./models/chatRoom";
import { errorHandleMiddleware } from "./middleware/errorHandlerMiddleware";
import { roomModel } from "./models/rooms";
import { chatRoomRoute } from "./routes/Chatroom/chatRoom";

dotenv.config();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
const HttpServer = createServer(app);
const io = new Server(HttpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

const startApp = async () => {
  try {
    const user = new User();
    await dbConnection();

    // socketServer.io
    io.on("connection", (socket) => {
      socket.on("createRoom", async (roomOption) => {
        socket.join(roomOption.roomUniqueName);

        console.log();

        io.to(roomOption.roomUniqueName).emit("getCreateRoom", roomOption);

        // const roomModelDb = new roomModel(roomOption);
        // await roomModelDb.save();
      });

      socket.on("welcomeMessage", (room) => {
        socket.join(room.room);
        user.addUser(socket.id, room.room);
        // console.log(room.room);
        const userRoom = user.getUser(room.room);

        if (userRoom) {
          io.to(userRoom.room).emit(
            "welcomeMessage",
            `welcome to ${room.room} room`
          );
        } else {
          console.log("User not found or missing room information.");
        }
      });

      socket.on("submitMessage", async (data) => {
        socket.join(data.room);
        // console.log(userRoom);
        const submittedChatData = {
          name: data.name,
          room: data.room,
          chat: data.chat,
          time: data.time,
        };

        io.to(data.room).emit("exchangeMessage", submittedChatData);
        // const chatRoom = new chatRoomModel(submittedChatData);
        // console.log("db ...");
        // await chatRoom.save();
      });
    });

    // routes
    app.use("/auth", AuthRoute);
    app.use("/room", chatRoomRoute);
    app.use(errorHandleMiddleware);
    HttpServer.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
