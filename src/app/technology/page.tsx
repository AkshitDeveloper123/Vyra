import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ListeningRoom } from "@/components/technology/ListeningRoom";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import {
  EarcupDiagram,
  PressureMap,
  SoundstageDiagram,
  Waveform,
} from "@/components/visuals/Diagrams";
import { TECHNOLOGY_PILLARS } from "@/data/features";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The concept systems behind VYRA ONE: acoustic architecture, spatial rendering, noise control, materials, ergonomics and interface.",
};

const STATS = [
  { value: "40 mm", label: "Beryllium-coated driver" },
  { value: "32 dB", label: "Illustrative attenuation" },
  { value: "278 g", label: "Concept weight" },
  { value: "40 h", label: "Concept playback" },
];

function MaterialStudy() {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <div className="rounded-xl border border-line bg-[linear-gradient(135deg,#2a2e39,#151821_55%,#0b0c11)] p-4">
        <span className="block h-20 rounded-lg border border-white/10 bg-[repeating-linear-gradient(105deg,rgba(240,238,233,0.08)_0_1px,transparent_1px_4px)]" />
        <p className="label mt-3 text-ivory">Aluminium</p>
        <p className="mt-1 text-[10px] text-silver-dim">Anodised / bead-blasted</p>
      </div>
      <div className="rounded-xl border border-line bg-[linear-gradient(135deg,#1a1d25,#0d0f14)] p-4">
        <span className="block h-20 rounded-lg border border-white/10 bg-[radial-gradient(circle_at_30%_20%,#23262f,#101218_70%)] [background-size:8px_8px]" />
        <p className="label mt-3 text-ivory">Composite</p>
        <p className="mt-1 text-[10px] text-silver-dim">Recycled / structural</p>
      </div>
      <div className="rounded-xl border border-line bg-[linear-gradient(135deg,#1a1d25,#0d0f14)] p-4">
        <span className="block h-20 rounded-lg border border-white/10 bg-[repeating-linear-gradient(45deg,rgba(240,238,233,0.1)_0_1px,transparent_1px_5px),repeating-linear-gradient(-45deg,rgba(240,238,233,0.07)_0_1px,transparent_1px_5px)]" />
        <p className="label mt-3 text-ivory">Textile</p>
        <p className="mt-1 text-[10px] text-silver-dim">Knitted / replaceable</p>
      </div>
    </div>
  );
}

function InterfaceStudy() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(90%_90%_at_50%_40%,#171a23,#0a0b10_72%)] p-4">
      <svg
        viewBox="0 0 360 240"
        className="h-auto w-full"
        role="img"
        aria-label="Diagram of the VYRA ONE control rail and touch gestures"
      >
        <rect x="36" y="74" width="288" height="92" rx="46" fill="#0d0f14" stroke="#F0EEE9" strokeOpacity="0.16" />
        <rect x="56" y="94" width="52" height="52" rx="26" fill="#14171f" stroke="#F0EEE9" strokeOpacity="0.1" />
        <path d="M74 120h16M82 112v16" stroke="#F0EEE9" strokeOpacity="0.6" strokeWidth="1.2" />
        <circle cx="180" cy="120" r="20" fill="none" stroke="#8271ff" strokeOpacity="0.5" />
        <circle cx="180" cy="120" r="4" fill="#8271ff" />
        <path d="M238 112c10-8 22-8 32 0M238 128c10 8 22 8 32 0" stroke="#F0EEE9" strokeOpacity="0.35" fill="none" />
        <g fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill="#A8AAB5">
          <text x="82" y="58" textAnchor="middle">POWER / PAIR</text>
          <path d="M82 64v8" stroke="#F0EEE9" strokeOpacity="0.25" />
          <text x="180" y="58" textAnchor="middle">MODE</text>
          <path d="M180 64v30" stroke="#F0EEE9" strokeOpacity="0.25" />
          <text x="254" y="58" textAnchor="middle">TOUCH SURFACE</text>
          <path d="M254 64v42" stroke="#F0EEE9" strokeOpacity="0.25" />
          <text x="82" y="194" textAnchor="middle" fill="#71747F">PHYSICAL</text>
          <text x="254" y="194" textAnchor="middle" fill="#71747F">GESTURE</text>
        </g>
        <path d="M222 178c0-14 11-24 24-24s24 10 24 24" fill="none" stroke="#8271ff" strokeOpacity="0.3" strokeDasharray="2 5" />
        <circle cx="246" cy="178" r="2" fill="#8271ff" />
      </svg>
      <p className="label mt-1 text-silver-dim">Control rail / concept interface study</p>
    </div>
  );
}

function PillarVisual({ id }: { id: string }) {
  if (id === "acoustics") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(120%_120%_at_30%_20%,#151824,#0a0b10_70%)] p-3">
        <EarcupDiagram />
      </div>
    );
  }
  if (id === "spatial") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(90%_90%_at_50%_50%,#151824,#0a0b10_72%)] p-4">
        <SoundstageDiagram immersion={0.78} />
      </div>
    );
  }
  if (id === "noise") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(90%_90%_at_50%_50%,#151824,#0a0b10_72%)] p-5">
        <p className="label text-silver-dim">Attenuation / illustrative bands</p>
        <Waveform className="mt-8 h-24 text-violet/70" bars={72} />
        <div className="mt-8 flex justify-between border-t border-line pt-3">
          <span className="label text-silver-dim">63 Hz</span>
          <span className="label text-silver-dim">1 kHz</span>
          <span className="label text-silver-dim">8 kHz</span>
        </div>
      </div>
    );
  }
  if (id === "materials") return <MaterialStudy />;
  if (id === "ergonomics") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(100%_100%_at_50%_40%,#151824,#0a0b10_72%)] p-4">
        <PressureMap />
      </div>
    );
  }
  return <InterfaceStudy />;
}

export default function TechnologyPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_70%_20%,rgba(130,113,255,0.13),transparent_65%)]"
        />
        <div className="grain-local" aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-silver-dim">
            <Link href="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-silver">Technology</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <span className="pill border-violet/30 bg-violet/[0.06] text-violet-soft">
                <span className="h-1 w-1 rounded-full bg-violet shadow-[0_0_8px_#8271ff]" />
                Concept engineering
              </span>
              <h1 className="display mt-6 text-[clamp(2.9rem,8.4vw,8.4rem)]">
                THE ARCHITECTURE
                <br />
                OF <span className="text-silver/40">ATTENTION.</span>
              </h1>
            </div>
            <div className="lg:col-span-3 lg:pb-3">
              <p className="copy max-w-sm text-[14px] md:text-[15px]">
                Six systems, designed as one object. The technology is only successful when it
                stops asking for your attention.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[20px] tabular-nums tracking-[-0.03em] text-ivory">{stat.value}</p>
                <p className="label mt-1.5 text-silver-dim">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="label mt-4 text-silver-dim">
            All figures are illustrative concept specifications, not measured performance.
          </p>
        </div>
      </section>

      <section aria-label="Technology pillars" className="shell pb-8">
        {TECHNOLOGY_PILLARS.map((pillar, index) => {
          const reversed = index % 2 === 1;
          return (
            <article
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-24 border-t border-line py-12 md:py-16"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <SectionLabel index={pillar.index}>System study</SectionLabel>
                  <h2 className="display mt-5 text-[clamp(2rem,3.4vw,3.2rem)]">
                    {pillar.title.split(" ").map((word, wordIndex) => (
                      <span key={`${word}-${wordIndex}`} className="block">
                        {word}
                      </span>
                    ))}
                  </h2>
                  <p className="label mt-5 max-w-[260px] leading-relaxed text-silver-dim">
                    {pillar.note}
                  </p>
                </div>

                <div
                  className={cn(
                    "grid gap-6 md:grid-cols-2 md:items-center lg:col-span-8",
                    reversed && "md:[&>*:first-child]:order-2",
                  )}
                >
                  <Reveal>
                    <PillarVisual id={pillar.id} />
                  </Reveal>
                  <Reveal delay={0.08}>
                    <div className="max-w-[460px]">
                      <p className="copy text-[14px] leading-[1.7] md:text-[15px]">{pillar.body}</p>
                      <div className="mt-6 hairline" />
                      <p className="label mt-4 text-silver-dim">
                        {pillar.index} / 06 — concept study
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <ListeningRoom />

      <section className="border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="07">Next</SectionLabel>
              <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
                FROM SYSTEM
                <br />
                <span className="text-silver/40">TO OBJECT.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="copy text-[14px]">
                See how the systems resolve into a single silhouette, then configure the finish,
                cushion and accessory for your concept build.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/product" magnetic>
                  Explore VYRA ONE
                  <ArrowIcon />
                </Button>
                <Button href="/our-story" variant="ghost">
                  Read the story
                </Button>
              </div>
              <Link
                href="/support#faq"
                className="group mt-6 inline-flex items-center gap-2 text-[12px] text-silver transition-colors hover:text-ivory"
              >
                <span className="link-underline">Questions about the concept?</span>
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
