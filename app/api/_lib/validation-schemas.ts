import * as z from "zod/v4-mini";

export const loginSchema = z.object({
  email: z.string().check(z.email()),
  password: z.string(),
});

export const signupSchema = z.object({
  firstName: z.string().check(z.minLength(1)),
  lastName: z.string().check(z.minLength(1)),
  email: z.string().check(z.email()),
  password: z.string(),
  isNotifEnabled: z.boolean(),
});

export const emailResetSchema = z.object({
  email: z.string().check(z.email()),
});
