"use client"

import { createContext, useState, useEffect } from "react";

interface SessionContextProps {
  token: string | null;
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
  token: string | null;
}) {
  const [tokenLocal, setTokenLocal] = useState<string | null>(token);
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
