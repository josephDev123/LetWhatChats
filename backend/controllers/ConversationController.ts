import { NextFunction, Request, Response } from "express";
import { ConversationService } from "../services/Conversation";
import { ConversationDTO } from "../DTO/conversationDTO";

export class ConversationController {
  constructor(private readonly ConversationService: ConversationService) {}
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const ExtractPayload: ConversationDTO = {
        conversation_name: payload.conversation_name,
      };
      const result = await this.ConversationService.create(
        ExtractPayload,
        payload.user_id
      );

      return res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  }
}
