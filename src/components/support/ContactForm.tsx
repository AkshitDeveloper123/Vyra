"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { cn, isValidEmail } from "@/lib/utils";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const TOPICS = [
  "Product & concept",
  "Demo ordering",
  "Shipping & returns",
  "Care & maintenance",
  "Something else",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter a name for the demo message.";
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (message.trim().length < 12) next.message = "Add a little more detail (12 characters or more).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setReference(`NOTE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setMessage("");
    setTopic(TOPICS[0]);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-graphite/25 p-6 sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-violet/40 bg-violet/10 text-violet-soft">
          <Check size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-[21px] tracking-[-0.025em] text-ivory">
          Your note is ready, {name.split(" ")[0]}.
        </h3>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-silver">
          It was validated locally and has <span className="text-ivory">not been sent</span>. This
          concept prototype has no inbox, no server and no external integration. Nothing left your
          browser.
        </p>
        <div className="mt-5 rounded-xl border border-line bg-ink/40 px-4 py-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-silver-dim">Local reference</span>
            <span className="font-mono text-ivory">{reference}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-silver-dim">Topic</span>
            <span className="text-ivory">{topic}</span>
          </div>
        </div>
        <button type="button" onClick={reset} className="btn btn-ghost btn-sm mt-6">
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-line bg-graphite/25 p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label mb-2 block text-silver-dim">
            Name
          </label>
          <input
            id="contact-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={cn("field", errors.name && "border-red-400/70")}
            placeholder="Alex Veyra"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-[11px] text-red-300">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="label mb-2 block text-silver-dim">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={cn("field", errors.email && "border-red-400/70")}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-[11px] text-red-300">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-topic" className="label mb-2 block text-silver-dim">
          Topic
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="field appearance-none rounded-none rounded-full bg-ink px-5 text-ivory"
        >
          {TOPICS.map((item) => (
            <option key={item} value={item} className="bg-ink text-ivory">
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="label mb-2 block text-silver-dim">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          rows={5}
          className={cn(
            "w-full resize-y rounded-2xl border border-line-strong bg-transparent px-5 py-4 text-[14px] text-ivory outline-none transition-colors placeholder:text-[#6b6e79] focus:border-violet focus:bg-violet/[0.04]",
            errors.message && "border-red-400/70",
          )}
          placeholder="Tell us what you would like to understand about the concept…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-note"}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-[11px] text-red-300">
            {errors.message}
          </p>
        ) : (
          <p id="contact-message-note" className="mt-2 text-[10px] leading-relaxed text-silver-dim">
            Local demonstration only. Your message is validated in this browser and never sent.
          </p>
        )}
      </div>

      <button type="submit" className="btn mt-5 w-full sm:w-auto">
        <Send size={14} strokeWidth={1.5} aria-hidden="true" />
        Prepare demo note
      </button>
    </form>
  );
}
