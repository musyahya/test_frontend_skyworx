import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import QueryProvider from "../components/templates/QueryProvider";
import { getTokenCookie } from "../lib/cookie";
import { SessionProvider } from "../components/templates/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow — Kelola Tugas & Proyek Harian Anda",
  description:
    "Aplikasi manajemen tugas modern untuk membantu Anda mengatur prioritas, melacak progres proyek, dan meningkatkan produktivitas harian secara real-time.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const token = await getTokenCookie()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider token={token}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
