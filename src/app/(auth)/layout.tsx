"use server";

import { getTokenCookie } from "@/src/lib/cookie";
import { redirect } from "next/navigation";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getTokenCookie();
  if (token) {
    redirect("/");
  }

  return children;
}
