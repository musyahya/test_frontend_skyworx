import z from "zod";

export const createTodoSchema = z.object({
   name: z
     .string()
     .nonempty("Nama tugas harus diisi"),
})

export type CreateTodoFormData = z.infer<typeof createTodoSchema>;

export const editTodoSchema = z.object({
  id: z.number,
   name: z
     .string()
     .nonempty("Nama tugas harus diisi"),
   status: z
     .enum(["todo", "inProgress", "done"], {
        error: "Status tidak valid"
     })
})

export type EditTodoFormData = z.infer<typeof editTodoSchema>;