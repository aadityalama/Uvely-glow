"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setStoreLocaleAction } from "@/app/actions/locale";
import type { StoreLocale } from "@/lib/i18n/constants";

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 3.2 4 6.1 4 9s-1.5 5.8-4 9c-2.5-3.2-4-6.1-4-9s1.5-5.8 4-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeaderLocaleDropdown({
  locale,
  englishPrimaryLabel,
  koreanSecondaryLabel,
  currentLabel,
  ariaLabel,
}: {
  locale: StoreLocale;
  englishPrimaryLabel: string;
  koreanSecondaryLabel: string;
  /** Short label shown on the closed control, e.g. "English" */
  currentLabel: string;
  ariaLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function pick(next: StoreLocale) {
    if (next === locale) {
      setOpen(false);
      return;
    }
    start(async () => {
      await setStoreLocaleAction(next);
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        disabled={pending}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:text-white"
      >
        <IconGlobe className="h-3.5 w-3.5 shrink-0 text-white/85" />
        <span>{currentLabel}</span>
        <IconChevronDown className="h-3 w-3 shrink-0 text-white/55" />
      </button>
      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[60] min-w-[13.5rem] rounded-md border border-zinc-200 bg-white py-1.5 text-zinc-900 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)]"
        >
          <button
            type="button"
            role="option"
            aria-selected={locale === "en"}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] font-medium tracking-wide text-zinc-800 transition hover:bg-zinc-50"
            onClick={() => pick("en")}
          >
            <span className="flex w-4 shrink-0 justify-center">
              {locale === "en" ? <IconCheck className="h-3.5 w-3.5 text-zinc-900" /> : null}
            </span>
            {englishPrimaryLabel}
          </button>
          <button
            type="button"
            role="option"
            aria-selected={locale === "ko"}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] font-medium tracking-wide text-zinc-800 transition hover:bg-zinc-50"
            onClick={() => pick("ko")}
          >
            <span className="flex w-4 shrink-0 justify-center">
              {locale === "ko" ? <IconCheck className="h-3.5 w-3.5 text-zinc-900" /> : null}
            </span>
            {koreanSecondaryLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
