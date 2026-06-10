"use client";

import { createContext, useContext } from "react";

type SessionValue = {
  userId: string | null;
  email: string | null;
};

const SessionContext = createContext<SessionValue>({
  userId: null,
  email: null,
});

export function SessionProvider({
  userId,
  email,
  children,
}: {
  userId: string | null;
  email: string | null;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={{ userId, email }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
