import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductViewer } from "@/components/product/ProductViewer";
import { Configurator } from "@/components/product/Configurator";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { EarcupDiagram } from "@/components/visuals/Diagrams";
import { BOX_CONTENTS, SPEC_GROUPS } from "@/data/specs";
import { CONCEPT_NOTE } from "@/data/product";
import { FEATURES } from "@/data/features";

export const metadata: Metadata = {
  title: "VYRA ONE",
  description:
    "Configure the fictional VYRA ONE concept headphone — three finishes, two cushion options and an interactive 360° study.",
};

export default function ProductPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-28 md:pb-14 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_20%,rgba(130,113,255,0.12),transparent_65%)]"
        />
        <div className="grain-local" aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-silver-dim">
            <Link href="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-silver">VYRA ONE</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="pill border-violet/30 bg-violet/[0.06] text-violet-soft">
                <span className="h-1 w-1 rounded-full bg-violet shadow-[0_0_8px_#8271ff]" />
                Concept product
              </span>
              <h1 className="display mt-6 text-[clamp(4rem,12vw,10rem)]">
                VYRA
                <br />
                ONE<span className="text-violet">.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="copy max-w-sm text-[14px] md:text-[15px]">
                An over-ear spatial audio system built around attention. Configure the object,
                inspect it in three dimensions, then read the concept specifications plainly.
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <p className="text-[22px] tabular-nums tracking-[-0.03em] text-ivory">From $399</p>
                <p className="label text-silver-dim">3 finishes / 2 cushion options</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="#configurator" className="btn btn-sm">
                  Configure
                  <ArrowIcon />
                </a>
                <a href="#specifications" className="btn btn-ghost btn-sm">
                  Specifications
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-20 md:pb-28" aria-label="Product viewer and configurator">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ProductViewer />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Configurator />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionLabel index="01">Design intent</SectionLabel>
              <blockquote className="display mt-6 text-[clamp(2rem,3.6vw,3.4rem)]">
                “THE OBJECT SHOULD DISAPPEAR BEFORE THE MUSIC DOES.”
              </blockquote>
              <p className="copy mt-6 max-w-md text-[14px]">
                VYRA ONE began as a silhouette. Controls were added only when a gesture could not
                do the job; materials were chosen for the second hour, not the first photograph.
              </p>
              <Link
                href="/our-story"
                className="group mt-6 inline-flex items-center gap-2 text-[12px] text-ivory"
              >
                <span className="link-underline">Read the design story</span>
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_120%_at_30%_20%,#151824,#0a0b10_70%)] p-3 sm:p-6">
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  <span className="label text-silver-dim">Fig. 07 — Acoustic chamber</span>
                </div>
                <div className="pt-8">
                  <EarcupDiagram />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-2 pb-1 pt-4">
                  <span className="label text-silver-dim">Concept cross-section</span>
                  <span className="label text-silver-dim">Not to scale</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="specifications" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="02">Specifications</SectionLabel>
            <p className="label text-silver-dim">Concept data / illustrative only</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.6rem,6vw,5.6rem)] lg:col-span-7">
              THE DETAILS,
              <br />
              <span className="text-silver/40">PLAINLY.</span>
            </h2>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="copy text-[14px] md:text-[15px]">
                Every figure below is a design intention for a fictional product. Nothing here has
                been measured, certified or shipped.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-x-14 gap-y-10 border-t border-line pt-10 md:grid-cols-2">
            {SPEC_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="label text-violet-soft">{group.title}</h3>
                <dl className="mt-4 divide-y divide-line">
                  {group.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-6 py-3.5 text-[12px]"
                    >
                      <dt className="text-silver">{row.label}</dt>
                      <dd className="text-right text-ivory">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-line bg-graphite/20 p-6 lg:col-span-5">
              <h3 className="label text-silver">In the box</h3>
              <ul className="mt-4 space-y-3">
                {BOX_CONTENTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[12px] text-silver">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-violet/25 bg-violet/[0.05] p-6 lg:col-span-7">
              <h3 className="label text-violet-soft">Important context</h3>
              <p className="mt-4 text-[13px] leading-relaxed text-silver">{CONCEPT_NOTE}</p>
              <p className="mt-3 text-[12px] leading-relaxed text-silver-dim">
                The bag and checkout are local demonstrations. No payment is collected, no order is
                fulfilled and no data leaves this browser.
              </p>
              <Link
                href="/support#faq"
                className="group mt-5 inline-flex items-center gap-2 text-[12px] text-ivory"
              >
                <span className="link-underline">Read the concept FAQ</span>
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

      <section className="border-t border-line py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="03">Systems</SectionLabel>
              <h2 className="display mt-6 text-[clamp(2.2rem,4.6vw,4rem)]">
                SIX SYSTEMS.
                <br />
                <span className="text-silver/40">ONE SILENCE.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="copy text-[14px]">
                Explore the disciplines behind VYRA ONE, from acoustic architecture to the feel of
                the control rail.
              </p>
              <Button href="/technology" variant="ghost" className="mt-5">
                Explore the technology
                <ArrowIcon />
              </Button>
            </div>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-0 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li
                key={feature.id}
                className="flex items-baseline justify-between gap-4 border-b border-line py-4"
              >
                <span className="text-[13px] text-silver">{feature.title}</span>
                <span className="label shrink-0 text-silver-dim">{feature.index}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
