import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const UpdateDataSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  photo: z
    .any()
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    phone: z.string().min(5).max(20),
    role: z.enum(["user", "admin"]).default("user"),
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password confirmation failed!",
    path: ["confirmPassword"],
  });

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Password confirmation failed!",
    path: ["confirmPassword"],
  });
