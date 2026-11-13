"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

export function Accordion({
  items,
  defaultOpen,
  className,
}: {
  items: FaqItem[];
  defaultOpen?: string;
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={`faq-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
              >
                <span className="flex items-baseline gap-5">
                  <span className="label mt-1 shrink-0 text-silver-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[17px] font-normal tracking-[-0.02em] md:text-[19px]">
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500",
                    isOpen ? "rotate-45 bg-ivory text-ink" : "text-silver group-hover:border-ivory/40",
                  )}
                >
                  <Plus size={14} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              className="acc-panel"
              data-open={isOpen}
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
            >
              <div>
                <p className="max-w-2xl pb-7 pl-0 text-[15px] leading-relaxed text-silver md:pl-10">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
