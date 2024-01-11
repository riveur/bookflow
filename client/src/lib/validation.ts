import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const LoginResponseSchema = z.object({
  type: z.string(),
  token: z.string(),
  expires_at: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  address: z.string(),
  number_phone: z.string(),
  role: z.enum(['LIBRARIAN', 'USER']),
  created_at: z.string(),
  updated_at: z.string(),
  fullname: z.string(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type User = z.infer<typeof UserSchema>;