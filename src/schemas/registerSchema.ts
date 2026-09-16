import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Nama harus diisi"),
  email: z
    .email("Email tidak valid")
    .nonempty("Email harus diisi"),
  password: z
    .string()
    .nonempty("Password harus diisi")
    .min(8, "Password minimal 8 karakter"),
  repeatPassword: z
    .string()
    .nonempty("Ulangi Password harus diisi")
    .min(8, "Password minimal 8 karakter")
})
.refine((data) => data.password === data.repeatPassword, {
    message: "Password dan Ulangi Password harus sama",
    path: ["repeatPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;