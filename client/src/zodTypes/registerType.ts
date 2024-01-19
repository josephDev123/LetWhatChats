import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  username: z.string().min(2).max(30),
  password: z.string().min(6).max(10),
  // profile_img: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(30),
  password: z.string().min(6).max(10),
});
