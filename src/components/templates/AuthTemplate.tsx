"use client";

import React, { useState } from "react";

export default function AuthTemplate() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // State Form Login
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  // State Form Register
  const [regName, setRegName] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin && regPassword !== regConfirmPassword) {
      alert("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    setLoading(true);

    if (isLogin) {
      console.log("Payload Login:", { email: loginEmail, password: loginPassword });
    } else {
      console.log("Payload Register:", { name: regName, email: regEmail, password: regPassword });
    }

    // Simulasi request API
    setTimeout(() => {
      setLoading(false);
      alert(isLogin ? "Berhasil login!" : "Pendaftaran berhasil!");
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header & Switcher */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isLogin ? "Selamat Datang Kembali" : "Buat Akun Baru"}
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            {isLogin
              ? "Masukkan akun kamu untuk melanjutkan akses"
              : "Lengkapi data di bawah ini untuk mendaftar"}
          </p>

        </div>

        {/* Form Body */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Input Nama (Khusus Register) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="John Doe"
                className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Input Email */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Alamat Email
            </label>
            <input
              type="email"
              required
              value={isLogin ? loginEmail : regEmail}
              onChange={(e) =>
                isLogin ? setLoginEmail(e.target.value) : setRegEmail(e.target.value)
              }
              placeholder="nama@email.com"
              className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
              Kata Sandi
            </label>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={isLogin ? loginPassword : regPassword}
                onChange={(e) =>
                  isLogin ? setLoginPassword(e.target.value) : setRegPassword(e.target.value)
                }
                placeholder="••••••••"
                className="block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-xs font-semibold text-slate-500 hover:text-slate-300"
              >
                {showPassword ? "Sembunyikan" : "Lihat"}
              </button>
            </div>
          </div>

          {/* Input Konfirmasi Password (Khusus Register) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
                Ulangi Kata Sandi
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
          >
            {loading && (
              <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading ? "Memproses..." : isLogin ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}