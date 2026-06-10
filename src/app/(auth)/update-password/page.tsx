"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePasswordAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-card p-8 shadow-sm">
      <h1 className="font-display text-3xl text-deep">New password</h1>
      <p className="mt-2 text-sm text-muted">Choose a strong password for your account.</p>
      <form
        className="mt-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setPending(true);
          const fd = new FormData(e.currentTarget);
          const res = await updatePasswordAction(fd);
          setPending(false);
          if (res?.error) setError(res.error);
          else if (res?.ok) {
            router.push("/account");
            router.refresh();
          }
        }}
      >
        <div>
          <Label htmlFor="password">New password</Label>
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
        <Button type="submit" variant="accent" className="w-full py-3" disabled={pending}>
          {pending ? "Saving…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
