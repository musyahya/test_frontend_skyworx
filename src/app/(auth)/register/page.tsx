"use client";

import TextField from "@/src/components/atoms/InputField";
import axios from "@/src/lib/axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/src/components/templates/AuthTemplate";
import Button from "@/src/components/atoms/Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false);

   const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true)
      const response = await axios.post("/register", {
        name: data.name,
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

          {/* Tombol Submit */}
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