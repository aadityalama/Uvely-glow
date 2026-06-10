"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitReviewAction } from "@/app/actions/reviews";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ReviewView } from "@/lib/services/reviews";

export function ReviewsPanel({
  productId,
  slug,
  initialReviews,
  canReview,
}: {
  productId: string;
  slug: string;
  initialReviews: ReviewView[];
  canReview: boolean;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="mt-14 space-y-8">
      <div>
        <h2 className="font-display text-2xl text-deep">Reviews</h2>
        <p className="mt-2 text-sm text-muted">
          Verified purchases appear after a quick moderation pass.
        </p>
        <ul className="mt-6 space-y-4">
          {initialReviews.length === 0 ? (
            <li className="text-sm text-muted">No reviews yet—be the first.</li>
          ) : (
            initialReviews.map((r) => (
              <li key={r.id} className="rounded-xl border border-line bg-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{r.title || "Five stars"}</p>
                  <span className="text-xs text-muted">{r.rating}★</span>
                </div>
                {r.body ? <p className="mt-2 text-sm text-muted">{r.body}</p> : null}
                <p className="mt-2 text-xs text-muted">
                  {r.author} · {new Date(r.createdAt).toLocaleDateString("ko-KR")}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
      {canReview ? (
        <form
          className="max-w-lg space-y-4 rounded-2xl border border-line bg-card p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setMsg(null);
            const fd = new FormData(e.currentTarget);
            fd.set("product_id", productId);
            fd.set("slug", slug);
            const res = await submitReviewAction(fd);
            if (res.error) setMsg(res.error);
            else if (res.ok) {
              setMsg("Thanks! Your review is pending approval.");
              router.refresh();
            }
          }}
        >
          <h3 className="font-display text-xl text-deep">Write a review</h3>
          <div>
            <Label htmlFor="rating">Rating (1–5)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              min={1}
              max={5}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="body">Details</Label>
            <textarea
              id="body"
              name="body"
              rows={4}
              className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
          </div>
          {msg ? <p className="text-sm text-muted">{msg}</p> : null}
          <Button type="submit" variant="accent">
            Submit review
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted">
          <a href="/login" className="text-accent underline-offset-4 hover:underline">
            Sign in
          </a>{" "}
          to share your experience.
        </p>
      )}
    </div>
  );
}
