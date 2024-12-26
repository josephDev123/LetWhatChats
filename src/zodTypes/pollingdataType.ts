import { z } from "zod";

export const pollingType = z.object({
  question: z.string().min(1),
  optionOne: z.string().min(1),
  optionTwo: z.string().min(1),
  multipleAnswer: z.boolean().optional(),
  type: z.string().optional(),
});
