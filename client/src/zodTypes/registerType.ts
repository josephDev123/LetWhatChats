import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  username: z.string().min(2).max(30),
  password: z.string(),
  profile_img: z.string(),
});
