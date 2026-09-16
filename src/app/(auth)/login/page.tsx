"use client";

import TextField from "@/src/components/atoms/InputField";
import axios from "@/src/lib/axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/src/components/templates/AuthTemplate";
import Button from "@/src/components/atoms/Button";
import { LoginFormData, loginSchema } from "@/src/schemas/loginSchema";

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false);

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("/register", {
        email: data.email,
        password: data.password,
      });

      console.log("success", response.data);
      alert("Pendaftaran berhasil!");
    } catch (error) {
      console.error("Register gagal:", error);
      alert("Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? "Memproses..." : "Daftar Akun Baru"}
          </Button>
        </form>
    </AuthTemplate>
  );
}