import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionLabel({
  index,
  children,
  className,
  tone = "default",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "violet";
}) {
  return (
    <div
      className={cn(
        "label flex items-center gap-3",
        tone === "violet" ? "text-violet-soft" : "text-silver-dim",
        className,
      )}
    >
      {index && <span className="tabular-nums">{index}</span>}
      <span className="h-px w-7 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function CornerMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-3 w-3 border-l border-t border-ivory/20",
        className,
      )}
    />
  );
}
