"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProfileAction } from "@/app/actions/profile";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { SavedAddress } from "@/lib/services/profile";
import type { CustomerProfile } from "@/types";

export function ProfileForm({
  profile,
  addresses,
}: {
  profile: CustomerProfile;
  addresses: SavedAddress[];
}) {
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
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,32rem)_1fr]">
        <form
          className="space-y-5 rounded-2xl border border-line bg-card p-6 sm:p-8"
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

        <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl text-deep">Saved addresses</h2>
              <p className="mt-1 text-sm text-muted">
                Addresses saved from Nepal checkout.
              </p>
            </div>
            <Link href="/checkout" className="text-sm text-accent hover:underline">
              Add at checkout
            </Link>
          </div>
          {addresses.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-line p-6 text-sm text-muted">
              No saved addresses yet.
            </p>
          ) : (
            <ul className="mt-6 space-y-3 text-sm">
              {addresses.map((address) => (
                <li key={address.id} className="rounded-xl bg-background p-4">
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold">{address.label}</span>
                    {address.isDefault ? (
                      <span className="text-xs uppercase tracking-widest text-accent">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-muted">{address.line1}</p>
                  {address.line2 ? <p className="text-muted">{address.line2}</p> : null}
                  <p className="text-muted">
                    {address.city}, {address.region} {address.postal}
                  </p>
                  <p className="text-muted">{address.country}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Container>
  );
}
