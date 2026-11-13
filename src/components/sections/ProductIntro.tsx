"use client";

import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EarcupDiagram } from "@/components/visuals/Diagrams";
import { ArrowIcon } from "@/components/ui/Button";
import Link from "next/link";

const DETAILS = [
  { label: "Structure", value: "Anodised aluminium" },
  { label: "Cushion", value: "Slow-recovery core" },
  { label: "Tuning", value: "Chamber-first" },
  { label: "Weight", value: "278 g (concept)" },
];

export function ProductIntro() {
  return (
    <section id="object" className="relative overflow-hidden py-20 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(130,113,255,0.07),transparent)] blur-2xl"
      />
      <div className="shell relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="01">The object</SectionLabel>
          <p className="label text-silver-dim">Designed in silence / assembled with intent</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <RevealText
              as="h2"
              lines={["NOT JUST SOUND.", "A DIFFERENT", "SENSATION."]}
              className="display text-[clamp(2.7rem,6.6vw,6.4rem)]"
              lineClassName={["", "text-silver/45", ""]}
              delay={0.05}
            />
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:pb-2">
            <Reveal delay={0.2}>
              <p className="copy">
                VYRA ONE is not a louder object. It is a more attentive one. Every surface, seal
                and gesture was designed to move the technology out of the way, so the recording
                can occupy the space it deserves.
              </p>
              <div className="mt-7 hairline" />
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                {DETAILS.map((detail) => (
                  <div key={detail.label}>
                    <dt className="label text-silver-dim">{detail.label}</dt>
                    <dd className="mt-1.5 text-[12px] text-ivory">{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/our-story"
                className="group mt-7 inline-flex items-center gap-2 text-[12px] text-ivory"
              >
                <span className="link-underline">Read the philosophy</span>
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-8">
            <div className="relative overflow-hidden border border-line bg-[radial-gradient(120%_120%_at_30%_20%,#151824,#0a0b10_70%)] p-3 sm:p-6">
              <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-violet" />
                <span className="label text-silver-dim">Fig. 01 — Acoustic chamber</span>
              </div>
              <div className="pt-8">
                <EarcupDiagram />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-2 pb-1 pt-4">
                <span className="label text-silver-dim">VYRA ONE / technical study</span>
                <span className="label text-silver-dim">Not to scale</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between border border-line bg-graphite/30 p-6 sm:p-8">
              <div>
                <span className="label text-violet-soft">Design note / 001</span>
                <blockquote className="mt-6 text-[clamp(1.45rem,2.4vw,2.1rem)] leading-[1.18] tracking-[-0.035em] text-ivory">
                  “Every surface is a decision about what to remove.”
                </blockquote>
              </div>
              <div className="mt-10">
                <div className="hairline" />
                <p className="mt-5 text-[12px] leading-relaxed text-silver">
                  The outer cup began as a single continuous curve. The controls, vents and hinge
                  were then recessed into it rather than added on top — so the object still reads
                  as one gesture.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-[10px] text-silver">
                    V
                  </span>
                  <div>
                    <p className="text-[11px] text-ivory">VYRA Design Studio</p>
                    <p className="label text-silver-dim">Concept narrative</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
