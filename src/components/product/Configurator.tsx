"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { useFinish } from "@/components/product/FinishProvider";
import {
  ACCESSORIES,
  BASE_PRICE,
  CUSHIONS,
  configPrice,
} from "@/data/product";
import type { AccessoryId, CushionId } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

export function Configurator() {
  const { finish, finishId, finishes, setFinish } = useFinish();
  const { addItem } = useCart();
  const [cushion, setCushion] = useState<CushionId>("standard");
  const [accessory, setAccessory] = useState<AccessoryId>("none");
  const [quantity, setQuantity] = useState(1);

  const unitPrice = configPrice(cushion, accessory);
  const total = unitPrice * quantity;
  const cushionPrice = CUSHIONS.find((item) => item.id === cushion)?.price ?? 0;
  const accessoryPrice = ACCESSORIES.find((item) => item.id === accessory)?.price ?? 0;

  const add = () => {
    addItem({ finish: finishId, cushion, accessory, quantity });
  };

  return (
    <div
      id="configurator"
      className="scroll-mt-28 rounded-2xl border border-line bg-graphite/20 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="label text-violet-soft">Configure</p>
          <h2 className="mt-1 text-[20px] tracking-[-0.025em] text-ivory">VYRA ONE</h2>
        </div>
        <span className="pill text-[8px] text-silver-dim">Concept edition</span>
      </div>

      <fieldset id="finish" className="mt-5 scroll-mt-28">
        <legend className="label mb-3 flex w-full items-center justify-between text-silver">
          <span>Finish</span>
          <span className="text-silver-dim">{finish.name}</span>
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {finishes.map((item) => {
            const active = item.id === finishId;
            return (
              <label
                key={item.id}
                className={cn(
                  "group relative cursor-pointer rounded-xl border p-3 text-center transition-all duration-300",
                  active
                    ? "border-violet/50 bg-violet/[0.08]"
                    : "border-line hover:border-ivory/30",
                )}
              >
                <input
                  type="radio"
                  name="finish"
                  value={item.id}
                  checked={active}
                  onChange={() => setFinish(item.id)}
                  className="sr-only"
                />
                <span
                  className="mx-auto block h-9 w-9 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle at 32% 28%, ${item.swatchEdge}, ${item.swatch} 58%, #08090d)`,
                  }}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "mt-2.5 block text-[11px] leading-tight transition-colors",
                    active ? "text-ivory" : "text-silver",
                  )}
                >
                  {item.name}
                </span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl ring-1 ring-violet/30"
                  />
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="label mb-3 text-silver">Cushions</legend>
        <div className="space-y-2">
          {CUSHIONS.map((item) => {
            const active = cushion === item.id;
            return (
              <label
                key={item.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-300",
                  active
                    ? "border-ivory/45 bg-ivory/[0.05]"
                    : "border-line hover:border-ivory/25",
                )}
              >
                <input
                  type="radio"
                  name="cushion"
                  value={item.id}
                  checked={active}
                  onChange={() => setCushion(item.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
                    active ? "border-violet" : "border-silver-dim",
                  )}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-violet" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[13px] text-ivory">{item.name}</span>
                    <span className="shrink-0 font-mono text-[10px] text-silver">
                      {item.price === 0 ? "Included" : `+${formatPrice(item.price)}`}
                    </span>
                  </span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-silver-dim">
                    {item.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="label mb-3 text-silver">Accessory</legend>
        <div className="space-y-2">
          {ACCESSORIES.map((item) => {
            const active = accessory === item.id;
            return (
              <label
                key={item.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-300",
                  active
                    ? "border-ivory/45 bg-ivory/[0.05]"
                    : "border-line hover:border-ivory/25",
                )}
              >
                <input
                  type="radio"
                  name="accessory"
                  value={item.id}
                  checked={active}
                  onChange={() => setAccessory(item.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
                    active ? "border-violet" : "border-silver-dim",
                  )}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-violet" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[13px] text-ivory">{item.name}</span>
                    <span className="shrink-0 font-mono text-[10px] text-silver">
                      {item.price === 0 ? "Included" : `+${formatPrice(item.price)}`}
                    </span>
                  </span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-silver-dim">
                    {item.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="label text-silver">Quantity</span>
        <div className="flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="grid h-9 w-9 place-items-center text-silver transition-colors hover:text-ivory disabled:opacity-30"
          >
            <Minus size={13} aria-hidden="true" />
          </button>
          <span
            className="w-8 text-center font-mono text-[12px] tabular-nums text-ivory"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.min(9, prev + 1))}
            disabled={quantity >= 9}
            aria-label="Increase quantity"
            className="grid h-9 w-9 place-items-center text-silver transition-colors hover:text-ivory disabled:opacity-30"
          >
            <Plus size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dl className="mt-5 space-y-2 border-t border-line pt-5 text-[12px]">
        <div className="flex items-center justify-between">
          <dt className="text-silver">VYRA ONE — base</dt>
          <dd className="tabular-nums text-ivory">{formatPrice(BASE_PRICE)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-silver">Cushions — {CUSHIONS.find((item) => item.id === cushion)?.name}</dt>
          <dd className="tabular-nums text-ivory">
            {cushionPrice === 0 ? "Included" : formatPrice(cushionPrice)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-silver">
            Accessory — {ACCESSORIES.find((item) => item.id === accessory)?.name}
          </dt>
          <dd className="tabular-nums text-ivory">
            {accessoryPrice === 0 ? "Included" : formatPrice(accessoryPrice)}
          </dd>
        </div>
        {quantity > 1 && (
          <div className="flex items-center justify-between">
            <dt className="text-silver">Quantity</dt>
            <dd className="tabular-nums text-ivory">× {quantity}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-[13px] text-silver">Total</span>
        <span className="text-[24px] tabular-nums tracking-[-0.03em] text-ivory" aria-live="polite">
          {formatPrice(total)}
        </span>
      </div>

      <button type="button" onClick={add} className="btn mt-5 w-full">
        <ShoppingBag size={15} strokeWidth={1.5} aria-hidden="true" />
        Add to bag — {formatPrice(total)}
      </button>

      <p className="mt-3 flex items-start justify-center gap-2 text-center text-[10px] leading-relaxed text-silver-dim">
        <ShieldCheck size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
        Demonstration store. No payment is collected and no order is placed.
      </p>
    </div>
  );
}
