"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string | string[];
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = as;
  const lineClass = (index: number) =>
    Array.isArray(lineClassName) ? lineClassName[index] : lineClassName;

  if (reduced) {
    return (
      <Tag className={className} aria-label={lines.join(" ")}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className={cn("block", lineClass(index))} aria-hidden="true">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          aria-hidden="true"
          className="block overflow-hidden pb-[0.09em] -mb-[0.09em]"
        >
          <motion.span
            className={cn("block", lineClass(index))}
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{
              duration: 1.05,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
