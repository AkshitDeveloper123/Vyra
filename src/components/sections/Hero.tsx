"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, MoveHorizontal } from "lucide-react";
import { Hero3D } from "@/components/three/lazy";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { useFinish } from "@/components/product/FinishProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "40 mm", label: "Beryllium-coated driver" },
  { value: "40 h", label: "Concept playback" },
  { value: "278 g", label: "Suspended architecture" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { finish, finishes, finishId, setFinish } = useFinish();
  const isDesktop = useMediaQuery("(min-width: 768px)", false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_72%_38%,rgba(130,113,255,0.14),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-black/50 to-transparent"
      />
      <div className="grain-local" aria-hidden="true" />

      <div className="shell relative flex min-h-[100svh] flex-col pb-7 pt-[88px] md:pt-[118px]">
        {/* 3D stage — in flow on mobile, full-bleed on desktop */}
        <div
          data-cursor-label="Drag to rotate"
          className="relative z-0 mt-2 h-[34svh] w-full md:absolute md:inset-0 md:mt-0 md:h-full"
        >
          <Hero3D
            finish={finish}
            offsetX={isDesktop ? 1.25 : 0}
            radius={isDesktop ? 3.25 : 2.95}
            className="relative z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 hidden bg-gradient-to-r from-ink via-ink/70 to-transparent md:block md:w-[58%]"
          />
        </div>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 mt-6 md:mt-[7vh]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill border-violet/30 bg-violet/[0.06] text-violet-soft">
              <span className="h-1 w-1 rounded-full bg-violet shadow-[0_0_8px_#8271ff]" />
              VYRA ONE
            </span>
            <span className="label text-silver-dim">Spatial audio system</span>
            <span className="label hidden text-silver-dim sm:inline">/ 01</span>
          </div>

          <h1
            id="hero-title"
            aria-label="Hear beyond the frame."
            className="display mt-6 max-w-[10ch] text-[clamp(3rem,9.4vw,8.6rem)] md:mt-8"
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                HEAR
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                BEYOND THE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                FRAME<span className="text-violet">.</span>
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <div className="relative z-10 mt-auto pt-8">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 lg:col-span-5"
            >
              <p className="copy max-w-md text-[15px] md:text-[16px]">
                Sound, reimagined. Experience a new dimension of personal audio with VYRA ONE.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href="/product" magnetic>
                  Explore VYRA ONE
                  <ArrowIcon />
                </Button>
                <Button href="/technology" variant="ghost">
                  Discover the technology
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:col-span-5 md:col-start-8 md:block lg:col-span-3 lg:col-start-10"
            >
              <p className="label mb-3 flex items-center gap-2 text-silver-dim">
                <MoveHorizontal size={13} aria-hidden="true" />
                Drag to explore
              </p>
              <fieldset className="min-w-0">
                <legend className="sr-only">Choose a VYRA ONE finish</legend>
                <div className="flex flex-wrap items-center gap-3">
                  {finishes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFinish(item.id)}
                      aria-label={`Select ${item.name} finish`}
                      aria-pressed={finishId === item.id}
                      data-cursor-label={item.name}
                      className={cn(
                        "group relative h-8 w-8 rounded-full border transition-all duration-500",
                        finishId === item.id
                          ? "scale-110 border-ivory/80"
                          : "border-white/10 hover:border-white/30",
                      )}
                      style={{
                        background: `radial-gradient(circle at 32% 28%, ${item.swatchEdge}, ${item.swatch} 58%, #08090d)`,
                      }}
                    >
                      {finishId === item.id && (
                        <span className="absolute -inset-1.5 rounded-full border border-violet/30" />
                      )}
                    </button>
                  ))}
                  <span className="label ml-1 text-silver">{finish.name}</span>
                </div>
              </fieldset>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-9 hidden border-t border-line pt-5 sm:block"
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-3">
                    <span className="text-[15px] tabular-nums tracking-[-0.02em] text-ivory">
                      {stat.value}
                    </span>
                    <span className="label text-silver-dim">{stat.label}</span>
                  </div>
                ))}
              </div>
              <p className="label text-silver-dim">Concept specifications</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="label text-silver-dim">Scroll</span>
        <span className="scroll-hint relative h-10 w-px overflow-hidden bg-ivory/10" />
        <ArrowDown size={12} className="text-silver-dim" />
      </div>
    </section>
  );
}
