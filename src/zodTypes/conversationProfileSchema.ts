import { z } from "zod";

const ConversationProfileSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .optional(),
  conversationName: z
    .string()
    // .min(1, { message: "Conversation name is required" })
    .max(15, {
      message: "Conversation name must be less than 15 characters",
    }),
});

export default ConversationProfileSchema;
export type conversationProfileSchemaType = z.infer<
  typeof ConversationProfileSchema
>;
