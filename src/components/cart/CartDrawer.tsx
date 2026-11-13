"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "./CartProvider";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { HeadphonesPoster } from "@/components/three/HeadphonesPoster";
import {
  ACCESSORY_MAP,
  CUSHION_MAP,
  FINISH_MAP,
} from "@/data/product";
import { cn, formatPrice, isValidEmail } from "@/lib/utils";

type Step = "bag" | "checkout" | "done";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [step, setStep] = useState<Step>("bag");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [orderRef, setOrderRef] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      setStep("bag");
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Enter a name for the demo order.";
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setOrderTotal(subtotal);
    setOrderRef(`VYRA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setStep("done");
    clearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[85]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            ref={trapRef}
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-line bg-ink shadow-[-30px_0_80px_rgba(0,0,0,0.5)] sm:max-w-[440px]"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button
                    type="button"
                    onClick={() => setStep("bag")}
                    aria-label="Back to bag"
                    className="grid h-8 w-8 place-items-center rounded-full border border-line text-silver transition-colors hover:text-ivory"
                  >
                    <ArrowLeft size={14} aria-hidden="true" />
                  </button>
                )}
                <h2 id="bag-title" className="text-[15px] font-medium tracking-[-0.01em]">
                  {step === "bag" && `Your bag${count > 0 ? ` — ${count}` : ""}`}
                  {step === "checkout" && "Demo checkout"}
                  {step === "done" && "Demo order recorded"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-silver transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </header>

            {step === "bag" && (
              <>
                <div className="flex-1 overflow-y-auto px-5 sm:px-6">
                  {items.length === 0 ? (
                    <div className="flex h-full min-h-[340px] flex-col items-center justify-center text-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-line text-silver-dim">
                        <ShoppingBag size={20} strokeWidth={1.3} aria-hidden="true" />
                      </span>
                      <p className="mt-5 text-[17px] tracking-[-0.02em] text-ivory">
                        Your bag is empty.
                      </p>
                      <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-silver">
                        Configure VYRA ONE in the finish that belongs to you.
                      </p>
                      <Link
                        href="/product"
                        onClick={closeCart}
                        className="btn btn-ghost btn-sm mt-6"
                      >
                        Explore VYRA ONE
                      </Link>
                    </div>
                  ) : (
                    <ul className="divide-y divide-line">
                      {items.map((item) => {
                        const finish = FINISH_MAP[item.finish];
                        return (
                          <li key={item.key} className="flex gap-4 py-5">
                            <div
                              className="relative h-[88px] w-[76px] shrink-0 overflow-hidden rounded-lg border border-line"
                              style={{
                                background: `radial-gradient(80% 70% at 50% 40%, ${finish.swatch}22, #0a0b10 70%)`,
                              }}
                            >
                              <HeadphonesPoster
                                finish={finish}
                                className="scale-110"
                                label={`VYRA ONE in ${finish.name}`}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-[14px] text-ivory">VYRA ONE</p>
                                  <p className="mt-0.5 text-[12px] text-silver">
                                    {finish.name} · {CUSHION_MAP[item.cushion].name} cushions
                                    {item.accessory !== "none" &&
                                      ` · ${ACCESSORY_MAP[item.accessory].name}`}
                                  </p>
                                </div>
                                <p className="shrink-0 text-[13px] tabular-nums text-ivory">
                                  {formatPrice(item.unitPrice * item.quantity)}
                                </p>
                              </div>

                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center rounded-full border border-line">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                    aria-label={`Decrease quantity of VYRA ONE ${finish.name}`}
                                    className="grid h-8 w-8 place-items-center text-silver transition-colors hover:text-ivory"
                                  >
                                    <Minus size={12} aria-hidden="true" />
                                  </button>
                                  <span
                                    className="w-7 text-center font-mono text-[11px] tabular-nums text-ivory"
                                    aria-live="polite"
                                  >
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                    aria-label={`Increase quantity of VYRA ONE ${finish.name}`}
                                    className="grid h-8 w-8 place-items-center text-silver transition-colors hover:text-ivory"
                                  >
                                    <Plus size={12} aria-hidden="true" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.key)}
                                  className="flex items-center gap-1.5 text-[11px] text-silver-dim transition-colors hover:text-ivory"
                                >
                                  <Trash2 size={12} aria-hidden="true" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {items.length > 0 && (
                  <footer className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-silver">Subtotal</span>
                      <span className="text-[17px] tabular-nums tracking-[-0.02em]" aria-live="polite">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-silver-dim">
                      Concept delivery included. No tax is calculated in this prototype.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep("checkout")}
                      className="btn mt-5 w-full"
                    >
                      Continue to demo checkout
                    </button>
                    <p className="mt-3 text-center text-[10px] leading-relaxed text-silver-dim">
                      Demonstration store — no payment is collected and no order is placed.
                    </p>
                  </footer>
                )}
              </>
            )}

            {step === "checkout" && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                  <div className="rounded-xl border border-line bg-graphite/40 p-4">
                    <p className="label text-silver-dim">Order summary</p>
                    <ul className="mt-3 space-y-2">
                      {items.map((item) => (
                        <li
                          key={item.key}
                          className="flex items-start justify-between gap-3 text-[12px]"
                        >
                          <span className="text-silver">
                            {FINISH_MAP[item.finish].name} · {CUSHION_MAP[item.cushion].name} ×{" "}
                            {item.quantity}
                          </span>
                          <span className="shrink-0 tabular-nums text-ivory">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                      <span className="text-[12px] text-silver">Total</span>
                      <span className="text-[15px] tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label htmlFor="demo-name" className="label mb-2 block text-silver-dim">
                        Full name
                      </label>
                      <input
                        id="demo-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className={cn("field", errors.name && "border-red-400/70")}
                        placeholder="Alex Veyra"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "demo-name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="demo-name-error" className="mt-1.5 text-[11px] text-red-300">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="demo-email" className="label mb-2 block text-silver-dim">
                        Email
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={cn("field", errors.email && "border-red-400/70")}
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "demo-email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="demo-email-error" className="mt-1.5 text-[11px] text-red-300">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="rounded-xl border border-violet/25 bg-violet/[0.06] p-4">
                      <p className="text-[12px] font-medium text-ivory">This is a demonstration.</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-silver">
                        No payment details are requested. Your name and email stay in this browser
                        only, are not transmitted, and no order is created.
                      </p>
                    </div>

                    <button type="submit" className="btn w-full">
                      Place demo order
                    </button>
                  </form>
                </div>
              </>
            )}

            {step === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid h-14 w-14 place-items-center rounded-full border border-violet/40 bg-violet/10 text-violet-soft"
                >
                  <Check size={22} strokeWidth={1.6} aria-hidden="true" />
                </motion.span>
                <h3 className="mt-6 text-[22px] tracking-[-0.03em]">Thank you, {name.split(" ")[0]}.</h3>
                <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-silver">
                  Your demo order has been recorded locally. Nothing was charged, sent or
                  fulfilled — this is a concept experience.
                </p>
                <div className="mt-6 w-full max-w-[280px] rounded-xl border border-line bg-graphite/40 px-4 py-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-silver-dim">Reference</span>
                    <span className="font-mono text-ivory">{orderRef}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-silver-dim">Demo total</span>
                    <span className="tabular-nums text-ivory">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                <button type="button" onClick={closeCart} className="btn btn-ghost btn-sm mt-8">
                  Continue exploring
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
