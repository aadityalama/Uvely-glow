import { cookies } from "next/headers";
import { STORE_LOCALE_COOKIE, type StoreLocale } from "@/lib/i18n/constants";

export async function getStoreLocale(): Promise<StoreLocale> {
  const raw = (await cookies()).get(STORE_LOCALE_COOKIE)?.value;
  return raw === "ko" ? "ko" : "en";
}
