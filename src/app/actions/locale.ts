"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { STORE_LOCALE_COOKIE, type StoreLocale } from "@/lib/i18n/constants";

export async function setStoreLocaleAction(locale: StoreLocale) {
  const jar = await cookies();
  jar.set(STORE_LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
