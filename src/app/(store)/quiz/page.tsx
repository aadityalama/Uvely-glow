"use client";

import Link from "next/link";
import { useState } from "react";
import { saveQuizResultAction } from "@/app/actions/marketing";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

type Result = Awaited<ReturnType<typeof saveQuizResultAction>>["recommendations"];

const concerns = [
  { id: "dehydration", label: "Dehydration" },
  { id: "redness", label: "Redness" },
  { id: "barrier", label: "Barrier repair" },
  { id: "texture", label: "Texture" },
  { id: "sun", label: "Sun protection" },
  { id: "lips", label: "Lips" },
];

export default function QuizPage() {
  const [result, setResult] = useState<Result>([]);
  const [pending, setPending] = useState(false);

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          AI Skin Match
        </p>
        <h1 className="mt-3 font-display text-5xl text-deep">
          AI skincare quiz
        </h1>
        <p className="mt-4 text-muted">
          Find skin concerns, match ingredients, and get personalized product
          recommendations from the Uvely Glow catalog.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <form
          className="space-y-6 rounded-2xl border border-line bg-card p-6 sm:p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            setPending(true);
            const response = await saveQuizResultAction(new FormData(event.currentTarget));
            setResult(response.recommendations);
            setPending(false);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="skin_type">Skin type</Label>
              <select
                id="skin_type"
                name="skin_type"
                className="mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm"
              >
                <option value="combination">Combination</option>
                <option value="dry">Dry</option>
                <option value="oily">Oily</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>
            <div>
              <Label htmlFor="routine_goal">Routine goal</Label>
              <select
                id="routine_goal"
                name="routine_goal"
                className="mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm"
              >
                <option value="glow">Glow</option>
                <option value="minimal">Minimal routine</option>
                <option value="repair">Barrier repair</option>
                <option value="spf">Daily SPF habit</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Skin concern finder</Label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {concerns.map((concern) => (
                <label
                  key={concern.id}
                  className="flex items-center gap-2 rounded-xl border border-line bg-background px-3 py-2 text-sm"
                >
                  <input type="checkbox" name="concerns" value={concern.id} />
                  {concern.label}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                name="budget_krw"
                type="number"
                defaultValue={50000}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email for routine summary</Label>
              <Input id="email" name="email" type="email" className="mt-1.5" />
            </div>
          </div>
          <Button type="submit" variant="accent" disabled={pending}>
            {pending ? "Matching..." : "Find my matches"}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl text-deep">Your matches</h2>
          {result.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              Complete the quiz to generate product recommendations.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {result.map((item) => (
                <li key={item.id} className="rounded-xl bg-background p-4">
                  <Link href={`/products/${item.slug}`} className="font-semibold text-deep">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{item.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </Container>
  );
}
