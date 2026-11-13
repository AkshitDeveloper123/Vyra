"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useUI } from "@/components/ui/UIProvider";
import { cn, isValidEmail } from "@/lib/utils";

const STORAGE_KEY = "vyra:newsletter";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { showToast } = useUI();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address, for example name@domain.com.");
      return;
    }
    setError(null);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      if (!list.includes(email.trim().toLowerCase())) {
        list.push(email.trim().toLowerCase());
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch {
      setError("Your browser blocked local storage, so this demo cannot save your address.");
      return;
    }
    setDone(true);
    setEmail("");
    showToast(
      "Added to the local concept list",
      "Stored in this browser only. No email will be sent.",
    );
  };

  if (done) {
    return (
      <div className={cn("flex items-start gap-3 rounded-xl border border-line bg-graphite/40 p-4", compact && "p-3")}>
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet/15 text-violet-soft">
          <Check size={13} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[13px] text-ivory">You&apos;re on the local concept list.</p>
          <p className="mt-1 text-[11px] leading-relaxed text-silver">
            This is a demonstration. Your address was saved in this browser only — nothing was
            transmitted.
          </p>
          <button
            type="button"
            onClick={() => setDone(false)}
            className="mt-2 text-[11px] text-silver underline underline-offset-4 transition-colors hover:text-ivory"
          >
            Add another address
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor={compact ? "newsletter-compact" : "newsletter"} className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-3 border-b border-line-strong pb-3 transition-colors focus-within:border-ivory/50">
        <input
          id={compact ? "newsletter-compact" : "newsletter"}
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          placeholder="Your email address"
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="w-full bg-transparent text-[15px] text-ivory outline-none placeholder:text-silver-dim sm:text-[17px]"
        />
        <button
          type="submit"
          aria-label="Join the concept list"
          className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
        >
          <ArrowRight
            size={16}
            strokeWidth={1.4}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>
      <div aria-live="polite" className="min-h-[22px]">
        {error ? (
          <p id="newsletter-error" className="mt-2 text-[11px] text-red-300">
            {error}
          </p>
        ) : (
          <p className="mt-2 text-[10px] leading-relaxed text-silver-dim">
            Local demonstration only. No emails are sent or stored externally.
          </p>
        )}
      </div>
    </form>
  );
}
