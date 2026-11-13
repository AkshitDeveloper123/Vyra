"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Exploded3D } from "@/components/three/lazy";
import type { PartId } from "@/components/three/Headphones";
import { useFinish } from "@/components/product/FinishProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const PARTS: Array<{
  id: PartId;
  index: string;
  name: string;
  detail: string;
  meta: string;
}> = [
  {
    id: "band",
    index: "01",
    name: "Suspended band",
    detail:
      "A continuous composite band floats above the crown, distributing load away from a single pressure point. The inner textile is replaceable without tools.",
    meta: "Composite / textile",
  },
  {
    id: "frame",
    index: "02",
    name: "Structural frame",
    detail:
      "Anodised aluminium yokes carry the cups on a single axis. The hinge is recessed into the silhouette so the object reads as one continuous form.",
    meta: "Anodised aluminium",
  },
  {
    id: "acoustics",
    index: "03",
    name: "Acoustic chamber",
    detail:
      "The driver, rear volume and pressure vent are tuned as one system. Internal bracing breaks up standing waves before they reach the shell.",
    meta: "40 mm / vented",
  },
  {
    id: "cushion",
    index: "04",
    name: "Cushion assembly",
    detail:
      "Slow-recovery memory core under a knitted acoustic mesh. Magnetically mounted, so the seal can be renewed rather than replaced.",
    meta: "Replaceable / magnetic",
  },
  {
    id: "controls",
    index: "05",
    name: "Control rail",
    detail:
      "Power, pairing and mode live on a single machined rail. The outer cup reads gestures, confirmed by a quiet haptic pulse.",
    meta: "Machined / haptic",
  },
];

export function TechTeaser() {
  const { finish } = useFinish();
  const [active, setActive] = useState<PartId>("acoustics");
  const [exploded, setExploded] = useState(true);
  const part = PARTS.find((item) => item.id === active) ?? PARTS[2];

  return (
    <section id="anatomy" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="05">Anatomy</SectionLabel>
          <p className="label text-silver-dim">Five assemblies / one silhouette</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              as="h2"
              lines={["EVERY PART", "IN ITS PLACE."]}
              className="display text-[clamp(2.6rem,6.4vw,6.2rem)]"
              lineClassName={["", "text-silver/40"]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="copy text-[14px] md:text-[15px]">
              Pull VYRA ONE apart. Each assembly is a study in restraint — designed to be
              understood at a glance, then forgotten once it is worn.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(90%_75%_at_50%_45%,#141722,#090a0e_72%)]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  <span className="label text-silver-dim">Fig. 05 — Exploded assembly</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExploded((prev) => !prev)}
                  aria-pressed={exploded}
                  className="flex items-center gap-2 rounded-full border border-line bg-ink/50 px-3 py-1.5 text-[10px] text-silver backdrop-blur-md transition-colors hover:border-ivory/40 hover:text-ivory"
                >
                  {exploded ? (
                    <Minimize2 size={11} aria-hidden="true" />
                  ) : (
                    <Maximize2 size={11} aria-hidden="true" />
                  )}
                  {exploded ? "Assemble" : "Explode"}
                </button>
              </div>

              <div className="h-[460px] w-full sm:h-[540px] lg:h-[600px]">
                <Exploded3D
                  finish={finish}
                  highlight={active}
                  exploded={exploded}
                  onPartClick={setActive}
                  className="h-full w-full"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-t from-black/40 to-transparent p-4 pt-14 sm:p-5">
                <p className="label text-silver-dim">Select a component to inspect</p>
                <p className="label text-silver-dim">Drag to rotate</p>
              </div>
            </div>
          </Reveal>

          <div>
            <div className="border-t border-line">
              {PARTS.map((item) => {
                const selected = item.id === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item.id)}
                    onMouseEnter={() => setActive(item.id)}
                    onFocus={() => setActive(item.id)}
                    aria-pressed={selected}
                    className={cn(
                      "group flex w-full items-start gap-4 border-b border-line py-4 text-left transition-colors",
                      selected ? "text-ivory" : "text-silver hover:text-ivory",
                    )}
                  >
                    <span className="label mt-1 shrink-0 text-silver-dim">{item.index}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[15px] tracking-[-0.015em]">{item.name}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1 w-1 shrink-0 rounded-full transition-all duration-300",
                            selected
                              ? "bg-violet shadow-[0_0_10px_#8271ff]"
                              : "bg-transparent",
                          )}
                        />
                      </span>
                      <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-silver-dim">
                        {item.meta}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-6 min-h-[150px] rounded-xl border border-line bg-graphite/20 p-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="label text-violet-soft">{part.name}</p>
                    <span className="label text-silver-dim">{part.index} / 05</span>
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-silver">{part.detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="label mt-4 text-silver-dim">
              Concept engineering study — not a production teardown
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
