"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-card p-8 shadow-sm">
      <h1 className="font-display text-3xl text-deep">Reset password</h1>
      <p className="mt-2 text-sm text-muted">
        We will email you a secure link to choose a new password.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setSuccess(false);
          setPending(true);
          const res = await requestPasswordResetAction(new FormData(e.currentTarget));
          setPending(false);
          if (res.error) setError(res.error);
          else if (res.success) setSuccess(true);
        }}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="mt-1.5" />
        </div>
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        {success ? (
          <p className="text-sm text-muted">
            If an account exists for this email, you will receive a reset link shortly.
          </p>
        ) : null}
        <Button type="submit" variant="accent" className="w-full py-3" disabled={pending}>
          {pending ? "Sending…" : "Send reset link"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="text-muted hover:text-accent">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
