"use client";

import { useState } from "react";
import Link from "next/link";
import { signUpAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-card p-8 shadow-sm">
      <h1 className="font-display text-3xl text-deep">Create your account</h1>
      <p className="mt-2 text-sm text-muted">
        Join Uvely Glow for synced cart, wishlist, and order history.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setSuccess(false);
          setPending(true);
          const fd = new FormData(e.currentTarget);
          const res = await signUpAction(fd);
          setPending(false);
          if (res.error) setError(res.error);
          else if (res.success) setSuccess(true);
        }}
      >
        <div>
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" name="full_name" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1.5"
          />
        </div>
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        {success ? (
          <p className="text-sm text-muted">
            Check your inbox to verify your email before signing in.
          </p>
        ) : null}
        <Button type="submit" variant="accent" className="w-full py-3" disabled={pending}>
          {pending ? "Creating…" : "Sign up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
