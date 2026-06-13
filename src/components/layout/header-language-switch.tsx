"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setStoreLocaleAction } from "@/app/actions/locale";
import type { StoreLocale } from "@/lib/i18n/constants";
import { cn } from "@/lib/utils";

export function HeaderLanguageSwitch({
  locale,
  englishLabel,
  koreanLabel,
  ariaLabel,
}: {
  locale: StoreLocale;
  englishLabel: string;
  koreanLabel: string;
  ariaLabel: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function pick(next: StoreLocale) {
    if (next === locale) return;
    start(async () => {
      await setStoreLocaleAction(next);
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/20 bg-white/5 p-0.5"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => pick("en")}
        className={cn(
          "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition",
          locale === "en"
            ? "bg-white text-deep shadow-sm"
            : "text-white/70 hover:text-white",
        )}
      >
        {englishLabel}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => pick("ko")}
        className={cn(
          "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition",
          locale === "ko"
            ? "bg-white text-deep shadow-sm"
            : "text-white/70 hover:text-white",
        )}
      >
        {koreanLabel}
      </button>
    </div>
  );
}
