"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CustomerProfile, LocalOrder } from "@/types";

const ORDERS_KEY = "uvely-glow-orders";
const PROFILE_KEY = "uvely-glow-profile";

function readOrders(): LocalOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LocalOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readProfile(): CustomerProfile {
  if (typeof window === "undefined") {
    return { fullName: "", email: "", phone: "" };
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return { fullName: "", email: "", phone: "" };
    return JSON.parse(raw) as CustomerProfile;
  } catch {
    return { fullName: "", email: "", phone: "" };
  }
}

type AccountContextValue = {
  orders: LocalOrder[];
  addOrder: (order: LocalOrder) => void;
  profile: CustomerProfile;
  saveProfile: (p: CustomerProfile) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [profile, setProfile] = useState<CustomerProfile>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrders(readOrders());
    setProfile(readProfile());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile, ready]);

  const addOrder = useCallback((order: LocalOrder) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const saveProfile = useCallback((p: CustomerProfile) => {
    setProfile(p);
  }, []);

  const value = useMemo(
    () => ({ orders, addOrder, profile, saveProfile }),
    [orders, addOrder, profile, saveProfile],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
