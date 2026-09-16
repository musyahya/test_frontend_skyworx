"use client";

import TextField from "@/src/components/atoms/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/src/components/templates/AuthTemplate";
import Button from "@/src/components/atoms/Button";
import { useRegisterMutation } from "@/src/queries/register";

export default function RegisterPage() {
  const { mutateAsync: postRegister, isPending } = useRegisterMutation();

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await postRegister(data)
      alert("Pendaftaran berhasil!");
    } catch (error) {
      console.error("Register gagal:", error);
      alert("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  return (
    <AuthTemplate header="Buat Akun Baru">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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