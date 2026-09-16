import React, { useContext } from "react";
import { SessionContext } from "../components/templates/SessionProvider";

export default function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("session context not found");
  }

  return context;
}
