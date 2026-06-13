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
  variant = "onDark",
}: {
  locale: StoreLocale;
  englishLabel: string;
  koreanLabel: string;
  ariaLabel: string;
  variant?: "onDark" | "onLight";
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

  const inactive =
    variant === "onDark" ? "text-white/55 hover:text-white/90" : "text-zinc-500 hover:text-zinc-800";
  const active =
    variant === "onDark" ? "text-white border-white" : "text-deep border-deep";
  const sep = variant === "onDark" ? "text-white/35" : "text-zinc-300";

  return (
    <div
      className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => pick("en")}
        className={cn(
          "border-b border-transparent pb-0.5 transition",
          locale === "en" ? active : inactive,
        )}
      >
        {englishLabel}
      </button>
      <span className={cn("select-none text-[10px] font-normal", sep)} aria-hidden>
        |
      </span>
      <button
        type="button"
        disabled={pending}
        onClick={() => pick("ko")}
        className={cn(
          "border-b border-transparent pb-0.5 transition",
          locale === "ko" ? active : inactive,
        )}
      >
        {koreanLabel}
      </button>
    </div>
  );
}
