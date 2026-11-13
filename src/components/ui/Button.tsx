"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "solid" | "ghost" | "violet" | "bare";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  disabled?: boolean;
  magnetic?: boolean;
  "aria-label"?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

const variantClass: Record<Variant, string> = {
  solid: "btn",
  ghost: "btn btn-ghost",
  violet: "btn btn-violet",
  bare: "group inline-flex items-center gap-2 text-[13px] text-ivory",
};

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  size = "md",
  className,
  disabled,
  magnetic = false,
  ...aria
}: ButtonProps) {
  const classes = cn(
    variantClass[variant],
    size === "sm" && variant !== "bare" && "btn-sm",
    className,
  );

  const inner = (
    <>
      {variant === "bare" ? (
        <span className="link-underline">{children}</span>
      ) : (
        children
      )}
    </>
  );

  const content = href ? (
    <Link href={href} className={classes} aria-label={aria["aria-label"]} onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={aria["aria-label"]}
      aria-expanded={aria.ariaExpanded}
      aria-controls={aria.ariaControls}
    >
      {inner}
    </button>
  );

  if (magnetic) {
    return <Magnetic strength={0.22}>{content}</Magnetic>;
  }
  return content;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn(
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        className,
      )}
    >
      <path
        d="M3 11L11 3M11 3H4.5M11 3V9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
