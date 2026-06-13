"use client";

import { createContext, useContext } from "react";

type SessionValue = {
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
};

const SessionContext = createContext<SessionValue>({
  userId: null,
  email: null,
  isAdmin: false,
});

export function SessionProvider({
  userId,
  email,
  isAdmin = false,
  children,
}: {
  userId: string | null;
  email: string | null;
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={{ userId, email, isAdmin }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
