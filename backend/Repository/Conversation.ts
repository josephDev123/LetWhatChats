import mongoose, { Model } from "mongoose";
import { ConversationType } from "../models/Conversation";
import { ConversationDTO } from "../DTO/conversationDTO";
import { GlobalError } from "../utils/globalError";

export class ConversationRepo {
  constructor(private readonly ConversationModel: Model<ConversationType>) {}

  async create(
    payload: ConversationDTO,
    session?: mongoose.mongo.ClientSession
  ) {
    try {
      const ConversationDocs = new this.ConversationModel(payload);
      return await ConversationDocs.save({ session });
    } catch (error) {
      const CustomError = error as GlobalError;
      throw new GlobalError(
        CustomError.name,
        CustomError.message,
        CustomError.statusCode,
        CustomError.operational,
        CustomError.stack
      );
    }
  }

  async find(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      // const response = await this.ConversationModel.find({})
      //   .skip(skip)
      //   .limit(limit);

      const ConversationAndMemberGroup = [
        {
          $lookup: {
            from: "groupmembers",
            localField: "_id",
            foreignField: "conversation_id",
            as: "ConversationWithMember",
          },
        },
      ];
      const response = await this.ConversationModel.aggregate(
        ConversationAndMemberGroup
      );

      return response;
    } catch (error) {
      const ErrorFormat = error as GlobalError;
      throw new GlobalError(ErrorFormat.message, ErrorFormat.name, 400, false);
    }
  }
}
