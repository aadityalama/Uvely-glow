"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAccount } from "@/context/account-context";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { profile, saveProfile } = useAccount();
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
  }, [profile]);

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-deep">Profile</h1>
      <p className="mt-2 text-muted">
        Stored locally for this demo — connect Supabase Auth to sync across devices.
      </p>
      <form
        className="mx-auto mt-10 max-w-lg space-y-5 rounded-2xl border border-line bg-card p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          saveProfile({ fullName, email, phone });
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2000);
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
        <Button type="submit" variant="accent" className="w-full justify-center py-3">
          {saved ? "Saved" : "Save profile"}
        </Button>
      </form>
    </Container>
  );
}
