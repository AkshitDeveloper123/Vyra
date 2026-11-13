import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  markOnly = false,
  large = false,
}: {
  className?: string;
  markOnly?: boolean;
  large?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="VYRA — home"
      className={cn(
        "group inline-flex items-center gap-2.5 text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet",
        className,
      )}
    >
      <span className="relative block">
        <svg
          width={large ? 30 : 24}
          height={large ? 30 : 24}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          <path
            d="M4 6.5 L12 20 L20 6.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="3.2" r="1.4" fill="#8271FF" />
        </svg>
      </span>
      {!markOnly && (
        <span
          className={cn(
            "font-medium tracking-[-0.07em] leading-none",
            large ? "text-[30px]" : "text-[22px]",
          )}
        >
          VYRA
        </span>
      )}
    </Link>
  );
}
