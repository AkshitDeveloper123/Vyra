"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { Story3D } from "@/components/three/lazy";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useFinish } from "@/components/product/FinishProvider";
import { STORY_CHAPTERS } from "@/data/story";
import { cn } from "@/lib/utils";

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { finish } = useFinish();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);
  const railProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const chapter = STORY_CHAPTERS[index];

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      STORY_CHAPTERS.length - 1,
      Math.max(0, Math.floor(value * STORY_CHAPTERS.length)),
    );
    setIndex((prev) => (prev === next ? prev : next));
  });

  const jumpTo = (target: number) => {
    const section = ref.current;
    if (!section) return;
    const scrollable = section.offsetHeight - window.innerHeight;
    const top = section.offsetTop + (target / STORY_CHAPTERS.length) * scrollable + 2;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-title"
      className="relative h-[330vh] border-t border-line bg-ink"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_72%_50%,rgba(130,113,255,0.12),transparent_65%)]"
        />

        <div className="absolute inset-0 md:left-[22%]">
          <Story3D finish={finish} progress={scrollYProgress} />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent md:bg-gradient-to-r md:from-ink md:via-ink/85 md:to-transparent md:to-55%"
        />
        <div className="grain-local" aria-hidden="true" />

        <div className="shell relative flex h-full items-end pb-16 pt-24 md:items-center md:pb-0 md:pt-0">
          <div className="relative z-10 max-w-[540px]">
            <h2 id="experience-title" className="sr-only">
              The VYRA listening experience
            </h2>
            <SectionLabel index="03">The experience</SectionLabel>

            <div className="mt-7 min-h-[300px] sm:min-h-[320px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <span className="label text-violet-soft">{chapter.kicker}</span>
                    <span className="h-px w-8 bg-ivory/20" aria-hidden="true" />
                    <span className="label text-silver-dim">
                      {chapter.index} / {String(STORY_CHAPTERS.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h2
                    className="display mt-5 text-[clamp(2.3rem,4.6vw,4.2rem)]"
                  >
                    {chapter.title}
                  </h2>

                  <p className="copy mt-6 max-w-[440px] text-[14px] md:text-[15px]">
                    {chapter.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <div className="relative h-px w-28 overflow-hidden bg-ivory/15">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-ivory/80"
                  style={{ width: railProgress }}
                />
              </div>
              <span className="label text-silver-dim">
                {String(index + 1).padStart(2, "0")} / {String(STORY_CHAPTERS.length).padStart(2, "0")}
              </span>
              <span className="hidden items-center gap-2 text-silver-dim sm:flex">
                <ArrowDown size={12} aria-hidden="true" />
                <span className="label">Scroll</span>
              </span>
            </div>
          </div>

          <nav
            aria-label="Story chapters"
            className="absolute right-[var(--page-pad)] top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <ol className="relative flex flex-col gap-7">
              <span
                aria-hidden="true"
                className="absolute left-[3px] top-1 h-[calc(100%-8px)] w-px bg-ivory/10"
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-[3px] top-1 w-px bg-violet/70"
                style={{ height: railProgress }}
              />
              {STORY_CHAPTERS.map((item, itemIndex) => {
                const active = itemIndex === index;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(itemIndex)}
                      aria-current={active ? "true" : undefined}
                      aria-label={`Go to chapter ${item.index}: ${item.kicker}`}
                      className="group flex items-center gap-4 text-left"
                    >
                      <span
                        className={cn(
                          "relative z-10 block h-[7px] w-[7px] rounded-full border transition-all duration-500",
                          active
                            ? "border-violet bg-violet shadow-[0_0_10px_#8271ff]"
                            : "border-silver-dim bg-ink group-hover:border-ivory",
                        )}
                      />
                      <span
                        className={cn(
                          "label transition-colors duration-300",
                          active ? "text-ivory" : "text-silver-dim group-hover:text-silver",
                        )}
                      >
                        {item.kicker}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
