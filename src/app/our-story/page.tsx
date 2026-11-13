import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { PRINCIPLES, STORY_CHAPTERS, TIMELINE } from "@/data/story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The fictional story of VYRA — a concept studio built around attention, material honesty and the rituals of listening.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_30%,rgba(130,113,255,0.14),transparent_65%)]"
        />
        <div className="grain-local" aria-hidden="true" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-silver-dim">
            <Link href="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-silver">Our story</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="pill border-violet/30 bg-violet/[0.06] text-violet-soft">
                <span className="h-1 w-1 rounded-full bg-violet shadow-[0_0_8px_#8271ff]" />
                Concept studio / est. 2021
              </span>
              <h1 className="display mt-6 text-[clamp(3rem,8.6vw,8.6rem)]">
                A STUDIO
                <br />
                FOR <span className="text-silver/40">LISTENING.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="copy max-w-sm text-[14px] md:text-[15px]">
                VYRA is a fictional audio house created as a design and engineering study. The story
                below is an invented narrative — but the questions it asks about attention are real.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="label text-silver-dim">Fictional concept brand</span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="shell relative mt-14 md:mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(80%_120%_at_50%_0%,#171b27,#090a0e_70%)] px-6 py-16 sm:px-10 sm:py-24">
            <div className="grain-local" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/[0.06]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/[0.08]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/20 bg-violet/[0.04]"
            />
            <div className="relative mx-auto max-w-[760px] text-center">
              <p className="label text-violet-soft">A working principle</p>
              <p className="display mt-6 text-[clamp(2rem,5vw,4.2rem)]">
                “THE BEST TECHNOLOGY IS THE KIND YOU FORGET IS THERE.”
              </p>
              <p className="label mt-6 text-silver-dim">VYRA design note / 001</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Story chapters" className="shell py-10 md:py-16">
        {STORY_CHAPTERS.map((chapter, index) => (
          <article
            key={chapter.id}
            className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16"
          >
            <div className="md:col-span-4">
              <div className="flex items-baseline gap-4">
                <span className="display text-[clamp(3rem,6vw,5.2rem)] text-outline">
                  {chapter.index}
                </span>
                <span className="label text-silver-dim">{chapter.kicker}</span>
              </div>
            </div>
            <div className="md:col-span-8">
              <h2 className="display max-w-[720px] text-[clamp(1.9rem,3.6vw,3.2rem)]">
                {chapter.title}
              </h2>
              <p className="copy mt-5 max-w-[620px] text-[14px] leading-[1.75] md:text-[15px]">
                {chapter.body}
              </p>
              {index === 1 && (
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
                  <p className="text-[12px] text-silver">
                    <span className="text-ivory">41</span> silhouette iterations
                  </p>
                  <p className="text-[12px] text-silver">
                    <span className="text-ivory">278 g</span> concept weight
                  </p>
                  <p className="text-[12px] text-silver">
                    <span className="text-ivory">3</span> finishes
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <section id="principles" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="05">Principles</SectionLabel>
            <p className="label text-silver-dim">Four rules / no exceptions</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.4rem,5.6vw,5.4rem)] lg:col-span-7">
              HOW WE
              <br />
              <span className="text-silver/40">DECIDE.</span>
            </h2>
            <p className="copy max-w-md text-[14px] lg:col-span-5 md:text-[15px]">
              Principles are only useful when they remove options. These four are the ones we use
              to settle arguments inside the studio.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <Reveal key={principle.index} className="bg-ink">
                <div className="group h-full bg-graphite/15 p-6 transition-colors duration-500 hover:bg-graphite/30 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="display text-[clamp(2.4rem,4vw,3.6rem)] text-outline transition-colors duration-500 group-hover:text-ivory/60">
                      {principle.index}
                    </span>
                    <span className="label text-silver-dim">Principle</span>
                  </div>
                  <h3 className="mt-8 text-[20px] tracking-[-0.025em] text-ivory">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-[420px] text-[12px] leading-relaxed text-silver">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionLabel index="06">Concept timeline</SectionLabel>
                <RevealText
                  as="h2"
                  lines={["A FICTIONAL", "RECORD."]}
                  className="display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)]"
                  lineClassName={["", "text-silver/40"]}
                />
                <p className="copy mt-6 max-w-sm text-[13px]">
                  An invented chronology for the prototype. No dates, milestones or claims below
                  describe a real company or product.
                </p>
                <p className="label mt-5 text-silver-dim">2021 — 2026 / concept edition</p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ol className="relative border-l border-line pl-6 sm:pl-10">
                {TIMELINE.map((item, index) => (
                  <li key={item.year} className="relative pb-10 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={
                        index === TIMELINE.length - 1
                          ? "absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border border-violet bg-violet shadow-[0_0_12px_#8271ff] sm:-left-[47px]"
                          : "absolute -left-[29px] top-1.5 h-2 w-2 rounded-full border border-silver-dim bg-ink sm:-left-[45px]"
                      }
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-violet-soft">
                        {item.year}
                      </span>
                      <span className="label rounded-full border border-line px-2 py-0.5 text-[8px] text-silver-dim">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[17px] tracking-[-0.02em] text-ivory">{item.title}</h3>
                    <p className="mt-2 max-w-[560px] text-[12px] leading-relaxed text-silver">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-2 border-t border-line pt-4 text-[10px] leading-relaxed text-silver-dim">
                Timeline is illustrative fiction created for this prototype.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(130,113,255,0.12),transparent_65%)]"
        />
        <div className="shell relative">
          <div className="mx-auto max-w-[760px] text-center">
            <SectionLabel className="justify-center">Continue</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.4rem,5.6vw,5.2rem)]">
              LISTEN LONGER<span className="text-violet">.</span>
            </h2>
            <p className="copy mx-auto mt-5 max-w-md text-[14px]">
              The story is only useful if it becomes an object. Explore the systems, or configure
              the concept build.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/product" magnetic>
                Configure VYRA ONE
                <ArrowIcon />
              </Button>
              <Button href="/technology" variant="ghost">
                Explore the technology
              </Button>
            </div>
            <Link
              href="/support#contact"
              className="group mt-6 inline-flex items-center gap-2 text-[12px] text-silver transition-colors hover:text-ivory"
            >
              <span className="link-underline">Contact the concept studio</span>
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
