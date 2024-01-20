import express, { Express, Request, Response, NextFunction } from "express";
import { dbConnection } from "./db";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRoute } from "./routes/auths/authRoute";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middleware/authenticateToken";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
const HttpServer = createServer(app);
const socketServer = new Server(HttpServer, {
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
    await dbConnection();

    // socketServer.io
    socketServer.on("connection", (socket) => {
      socket.on("joinRoom", (room) => {
        //   // socket.to(data).emit("reponse", "welcome to the room");
        socket.on("exchangeMessage", (room, data) => {
          // console.log(room);
          socket.to(room).emit("exchangeMessage", data);
        });
      });
    });

    app.use("/auth", AuthRoute);

    HttpServer.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
