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
      const resp = await roomModel.find({ userEmail: email });
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
