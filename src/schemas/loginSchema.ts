import z from "zod";

export const loginSchema = z.object({
  email: z
    .email("Email tidak valid")
    .nonempty("Email harus diisi"),
  password: z
    .string()
    .nonempty("Password harus diisi")
})

export type LoginFormData = z.infer<typeof loginSchema>;