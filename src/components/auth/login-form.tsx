"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithPasswordAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setPending(true);
        const fd = new FormData(e.currentTarget);
        fd.set("next", next);
        const res = await signInWithPasswordAction(fd);
        setPending(false);
        if (res?.error) setError(res.error);
        else if (res?.ok && res.next) {
          router.push(res.next);
          router.refresh();
        }
      }}
    >
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
          className="mt-1.5"
        />
      </div>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <Button type="submit" variant="accent" className="w-full py-3" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm">
        <Link href="/forgot-password" className="text-muted hover:text-accent">
          Forgot password?
        </Link>
      </p>
    </form>
  );
}
