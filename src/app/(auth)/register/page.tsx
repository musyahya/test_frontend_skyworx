"use client";

import TextField from "@/src/components/atoms/TextField";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/src/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/src/components/templates/AuthTemplate";
import Button from "@/src/components/atoms/Button";
import { useRegisterMutation } from "@/src/queries/register";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/hooks/useToast";

export default function RegisterPage() {
  const { mutateAsync: postRegister, isPending } = useRegisterMutation();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await postRegister(data);
      if (result) {
        toast.success("Buat Akun Berhasil");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  return (
    <AuthTemplate header="Buat Akun Baru">
      <form noValidate className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nama"
          placeholder="Masukan Nama"
          error={errors.name?.message}
          {...register("name")}
        />

        <TextField
          label="Email"
          type="email"
          placeholder="Masukan Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <TextField
          label="Password"
          type="password"
          placeholder="Masukan Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <TextField
          label="Ulangi Password"
          type="password"
          placeholder="Masukan Ulangi Password"
          error={errors.repeatPassword?.message}
          {...register("repeatPassword")}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Memproses..." : "Daftar Akun Baru"}
        </Button>
      </form>

      {/* Footer Text dengan dukungan Dark & Light Mode */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
        Sudah punya akun?{" "}
        <span
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer transition-colors"
          onClick={() => router.push("/login")}
        >
          Login Sekarang
        </span>
      </div>
    </AuthTemplate>
  );
}