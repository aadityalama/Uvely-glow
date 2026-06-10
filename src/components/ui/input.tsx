import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-foreground/40 focus:ring-2 focus:ring-accent-soft",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted", className)}
      {...props}
    />
  );
}
