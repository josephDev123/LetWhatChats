import { Router } from "express";
import { GlobalError } from "../../utils/globalError";
import { roomModel } from "../../models/rooms";
import { Request, Response, NextFunction } from "express";

export const chatRoomRoute = Router();

chatRoomRoute.get("/:email", async function (req: Request, res: Response) {
  try {
    const { email } = req.params;
    const resp = await roomModel.find({ userEmail: email });
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    // GlobalError()
  }
});
