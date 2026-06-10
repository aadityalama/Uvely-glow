import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "bg-deep text-background hover:bg-foreground shadow-sm hover:shadow-md",
  outline:
    "border border-line bg-card text-foreground hover:border-foreground/30 hover:bg-background",
  ghost: "text-foreground hover:bg-accent-soft/60",
  accent: "bg-accent text-white hover:opacity-90 shadow-sm",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  className?: string;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
