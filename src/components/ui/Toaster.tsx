"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useUI } from "./UIProvider";

export function Toaster() {
  const { toast } = useUI();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-5 z-[95] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-line-strong bg-graphite/95 px-4 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet/15 text-violet-soft">
              <Check size={13} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[13px] font-medium text-ivory">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-[12px] leading-relaxed text-silver">
                  {toast.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
