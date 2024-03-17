import { Router } from "express";
import { GlobalError } from "../../utils/globalError";
import { roomModel } from "../../models/rooms";
import { Request, Response, NextFunction } from "express";

export const chatRoomRoute = Router();

chatRoomRoute.post(
  "/create",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const doc = new roomModel({
        userEmail: body.userEmail,
        roomUniqueName: body.roomUniqueName,
        avatar: body.avatar,
        time: body.time,
      });
      await doc.save();
      return res.status(200).json({ msg: "success" });
    } catch (error) {
      const errorHandler = new GlobalError(
        "something went wrong",
        "UnknownError",
        500,
        false
      );
      return next(errorHandler);
    }
  }
);

chatRoomRoute.get(
  "/:email",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const resp = await roomModel.find({
        $or: [
          { userEmail: email },
          { join: { $elemMatch: { userEmail: email } } },
        ],
      });

      // console.log("hello" + resp);
      return res.status(200).json(resp);
    } catch (error) {
      const errorHandler = new GlobalError(
        "something went wrong",
        "UnknownError",
        500,
        false
      );
      return next(errorHandler);
    }
  }
);

chatRoomRoute.get(
  "/channel/:channel",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { channel } = req.params;

      const resp = await roomModel.find({ roomUniqueName: channel });
      console.log(resp);
      return res.status(200).json(resp);
    } catch (error) {
      const errorHandler = new GlobalError(
        "something went wrong",
        "UnknownError",
        500,
        false
      );
      return next(errorHandler);
    }
  }
);

// chatRoomRoute.put(
//   "/:room",
//   async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       const { room } = req.params;
//       const roomResp = await roomModel.find(
//         { room: room },
//         { join: { $add: [] } }
//       );
//       // if (!roomResp) {
//       //   const errorHandler = new GlobalError(
//       //     "You cannot joined un-existed room",
//       //     "RoomError",
//       //     500,
//       //     true
//       //   );
//       //   return next(errorHandler);
//       // }
//       return res
//         .status(200)
//         .json({ data: roomResp, message: "invite successful" });
//     } catch (error) {
//       const errorHandler = new GlobalError(
//         "something went wrong",
//         "UnknownError",
//         500,
//         false
//       );
//       return next(errorHandler);
//     }
//   }
// );
