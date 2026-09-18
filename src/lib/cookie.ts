"use server";

import { Login } from "../types/login";
import { TOKEN_COOKIE } from "./constants";
import { cookies } from "next/headers";

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365 * 2;

export const setTokenCookie = async (token: {
    access_token: string
    refresh_token: string
}) => {
  const cookieStore = await cookies();

  cookieStore.set(TOKEN_COOKIE, JSON.stringify(token), {
    maxAge: COOKIE_MAX_AGE_SEC,
    secure: true,
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  });
  return { success: true };
};

export async function getTokenCookie(): Promise<Login | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return null;
  return await JSON.parse(token);
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
}