"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "@/app/actions/profile";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { CustomerProfile } from "@/types";

export function ProfileForm({ profile }: { profile: CustomerProfile }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-deep">Profile</h1>
      <p className="mt-2 text-muted">
        Your details are stored securely in Supabase.
      </p>
      <form
        className="mx-auto mt-10 max-w-lg space-y-5 rounded-2xl border border-line bg-card p-6 sm:p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null);
          setSaved(false);
          const fd = new FormData();
          fd.set("full_name", fullName);
          fd.set("email", email);
          fd.set("phone", phone);
          const res = await updateProfileAction(fd);
          if (res.error) setErr(res.error);
          else if (res.ok) {
            setSaved(true);
            router.refresh();
          }
        }}
      >
        <div>
          <Label htmlFor="fn">Full name</Label>
          <Input
            id="fn"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="em">Email</Label>
          <Input
            id="em"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="ph">Phone</Label>
          <Input
            id="ph"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5"
          />
        </div>
        {err ? <p className="text-sm text-accent">{err}</p> : null}
        <Button type="submit" variant="accent" className="w-full justify-center py-3">
          {saved ? "Saved" : "Save profile"}
        </Button>
      </form>
    </Container>
  );
}
