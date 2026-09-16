import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import QueryProvider from "../components/templates/QueryProvider";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
 

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
