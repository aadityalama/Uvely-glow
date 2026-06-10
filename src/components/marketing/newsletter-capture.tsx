"use client";

import { useActionState, useEffect, useState } from "react";
import { subscribeNewsletterAction } from "@/app/actions/marketing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCapture({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletterAction, null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (state?.ok) setDismissed(true);
  }, [state?.ok]);

  if (dismissed && !compact) return null;

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-line bg-card p-6"
          : "fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-xl rounded-2xl border border-line bg-card p-5 shadow-xl"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Glow Insider
          </p>
          <h2 className="mt-1 font-display text-2xl text-deep">
            Get 10% off your first ritual
          </h2>
          <p className="mt-1 text-sm text-muted">
            Join for K-beauty drops, skin concern guides, and code GLOW10.
          </p>
        </div>
        {!compact ? (
          <button
            type="button"
            className="text-sm text-muted"
            onClick={() => setDismissed(true)}
          >
            Close
          </button>
        ) : null}
      </div>
      <form action={formAction} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input type="hidden" name="source" value={compact ? "footer" : "popup"} />
        <Input name="email" type="email" placeholder="you@example.com" required />
        <Button type="submit" variant="accent" disabled={pending}>
          {pending ? "Joining..." : "Join"}
        </Button>
      </form>
      {state?.error ? <p className="mt-2 text-sm text-accent">{state.error}</p> : null}
      {state?.ok && compact ? (
        <p className="mt-2 text-sm text-accent">You are on the list.</p>
      ) : null}
    </div>
  );
}
