import { Model } from "mongoose";
import { ChatType } from "../models/Chat";
import { ChatDTO } from "../DTO/ChatDTO";

export class ChatRepo {
  constructor(private readonly ChatModel: Model<ChatType>) {}

  async createChat(payload: ChatDTO) {
    try {
      const chatDoc = new this.ChatModel(payload);
      return await chatDoc.save();
    } catch (error) {}
  }
}
