"use client";

import TextField from "@/src/components/atoms/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/src/components/templates/AuthTemplate";
import Button from "@/src/components/atoms/Button";
import { LoginFormData, loginSchema } from "@/src/schemas/loginSchema";
import { useLoginMutation } from "@/src/queries/login";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()
  const {mutateAsync: login, isPending} = useLoginMutation()

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data)
      if(result){
        router.push("/")
        alert("Pendaftaran berhasil!");
      }
    } catch (error) {
      console.error("Register gagal:", error);
      alert("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  return (
    <AuthTemplate header="Selamat Datang Kembali">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Memproses..." : "Daftar Akun Baru"}
          </Button>
        </form>
    </AuthTemplate>
  );
}