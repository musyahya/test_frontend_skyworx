"use client"

import { Login } from "@/src/types/login";
import { createContext, useState, useEffect } from "react";

interface SessionContextProps {
  token: Login | null;
  isLoading: boolean;
}

export const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

export function SessionProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: Login | null;
}) {
  const [tokenLocal, setTokenLocal] = useState<Login | null>(token);
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTokenLocal(token);

    return () => {
      setIsLoading(false);
    };
  }, [token]);

  return (
    <SessionContext.Provider
      value={{
        token: tokenLocal,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
