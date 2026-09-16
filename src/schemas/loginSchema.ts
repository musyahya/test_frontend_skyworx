import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email harus diisi")
    .email("Email tidak valid"),
  password: z
    .string()
    .nonempty("Password harus diisi")
})

export type LoginFormData = z.infer<typeof loginSchema>;