import z from "zod"

export const registerSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "name must be string",
        required_error: "name is required",
      })
      .min(3, { message: "name is too short" }),
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "must be a valid email" }),
    role: z.enum(["customer", "owner"]),
    password: z
      .string({ required_error: "password is required" })
      .min(8, { message: "password must be atleast 8 character long" }),
    confirmPassword: z
      .string({ required_error: "confirm password is required" })
      .min(8, { message: "password must be atleast 8 character long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords do not match",
  })
