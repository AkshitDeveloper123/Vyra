"use client";

import { useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Still3D } from "@/components/three/lazy";
import { useFinish } from "@/components/product/FinishProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FinishShowcase() {
  const { finish, finishId, finishes, setFinish } = useFinish();
  const radioRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = finishes.findIndex((item) => item.id === finishId);
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % finishes.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + finishes.length) % finishes.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = finishes.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setFinish(finishes[next].id);
    radioRefs.current[next]?.focus();
  };

  return (
    <section id="finishes" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="04">Material</SectionLabel>
          <p className="label text-silver-dim">Anodised aluminium / three studies</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <div
              className="relative overflow-hidden rounded-2xl border border-line transition-colors duration-700"
              style={{
                background: `radial-gradient(90% 75% at 50% 40%, ${finish.swatch}26, #090a0e 72%)`,
              }}
            >
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  <span className="label text-silver-dim">Fig. 04 — Finish study</span>
                </div>
                <span className="label text-silver-dim">{finish.short} / 03</span>
              </div>

              <div className="h-[400px] w-full sm:h-[500px] lg:h-[600px]">
                <Still3D
                  finish={finish}
                  rotation={[0.05, -0.55, 0]}
                  radius={2.85}
                  className="h-full w-full"
                  label={`VYRA ONE in ${finish.name}`}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-black/40 to-transparent p-4 pt-16 sm:p-5">
                <div>
                  <p className="label text-silver-dim">Finish</p>
                  <p className="mt-1 text-[15px] text-ivory">{finish.name}</p>
                </div>
                <p className="label text-silver-dim">Drag the hero to rotate</p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <RevealText
              as="h2"
              lines={["THREE FINISHES.", "ONE INTENT."]}
              className="display text-[clamp(2.5rem,5vw,4.6rem)]"
              lineClassName={["", "text-silver/40"]}
            />
            <Reveal delay={0.1}>
              <p className="copy mt-6 max-w-md text-[14px] md:text-[15px]">
                The finish is not a colour applied at the end. It is the surface the object was
                designed around — how it catches light, how it ages, how quietly it sits in a room.
              </p>
            </Reveal>

            <div
              role="radiogroup"
              aria-label="Choose a finish"
              onKeyDown={onKeyDown}
              className="mt-9 divide-y divide-line border-y border-line"
            >
              {finishes.map((item, index) => {
                const active = item.id === finishId;
                return (
                  <button
                    key={item.id}
                    ref={(element) => {
                      radioRefs.current[index] = element;
                    }}
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setFinish(item.id)}
                    className="group flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        active
                          ? "scale-105 border-ivory/60"
                          : "border-white/10 group-hover:border-white/30",
                      )}
                      style={{
                        background: `radial-gradient(circle at 32% 28%, ${item.swatchEdge}, ${item.swatch} 58%, #08090d)`,
                      }}
                    >
                      {active && (
                        <span className="absolute -inset-1.5 rounded-full border border-violet/30" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span
                          className={cn(
                            "text-[16px] tracking-[-0.015em] transition-colors",
                            active ? "text-ivory" : "text-silver group-hover:text-ivory",
                          )}
                        >
                          {item.name}
                        </span>
                        <span className="label shrink-0 text-silver-dim">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="block overflow-hidden"
                          >
                            <span className="mt-1.5 block max-w-[360px] text-[12px] leading-relaxed text-silver">
                              {item.description}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                );
              })}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="label max-w-[240px] text-silver-dim">
                  Selection carries across the site and is saved in this browser.
                </p>
                <Link
                  href="/product#configurator"
                  className="group inline-flex items-center gap-2 text-[12px] text-ivory"
                >
                  <span className="link-underline">Configure {finish.name}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
