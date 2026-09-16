"use client";

import TextField from "@/src/components/atoms/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/src/components/templates/AuthTemplate";
import Button from "@/src/components/atoms/Button";
import { LoginFormData, loginSchema } from "@/src/schemas/loginSchema";
import { useLoginMutation } from "@/src/queries/login";
import { useRouter } from "next/navigation";
import { setTokenCookie } from "@/src/lib/cookie";
import { useToast } from "@/src/hooks/useToast";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLoginMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);
      if (result) {
        await setTokenCookie(result.data.access_token);
        router.push("/");
        toast.success("Login berhasil!");
      }
    } catch (error) {
      toast.error("Login gagal. Silakan coba lagi.");
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "Memproses..." : "Masuk ke Akun"}
        </Button>
      </form>

      {/* Footer Text dengan dukungan Dark & Light mode */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
        Belum punya akun?{" "}
        <span
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer transition-colors"
          onClick={() => router.push("/register")}
        >
          Daftar Sekarang
        </span>
      </div>
    </AuthTemplate>
  );
}