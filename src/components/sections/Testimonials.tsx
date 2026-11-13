import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { PRESS_NOTES, TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;
  const strip = (
    <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
      {PRESS_NOTES.map((note) => (
        <span key={note} className="flex items-center gap-10 md:gap-16">
          <span className="label whitespace-nowrap text-silver-dim">{note}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-violet/60" aria-hidden="true" />
        </span>
      ))}
      <span className="label whitespace-nowrap text-silver-dim">
        VYRA ONE / CONCEPT EDITION
      </span>
      <span className="h-1 w-1 shrink-0 rounded-full bg-violet/60" aria-hidden="true" />
    </div>
  );

  return (
    <section id="notes" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="07">Listening notes</SectionLabel>
          <p className="label text-silver-dim">Illustrative / not verified reviews</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              as="h2"
              lines={["THE FIRST HOUR,", "IN WORDS."]}
              className="display text-[clamp(2.6rem,6.4vw,6.2rem)]"
              lineClassName={["", "text-silver/40"]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="copy text-[14px] md:text-[15px]">
              These are concept notes written for the prototype — an imagined record of how VYRA
              ONE might be received. They are not customer reviews or press coverage.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-7">
            <figure className="relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-graphite/25 p-6 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-16 select-none font-serif text-[220px] leading-none text-ivory/[0.04]"
              >
                “
              </div>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  <span className="label text-silver-dim">Note 01 / illustrative</span>
                </div>
                <blockquote className="mt-8 max-w-[560px] text-[clamp(1.5rem,2.8vw,2.35rem)] leading-[1.22] tracking-[-0.035em] text-ivory">
                  {featured.quote}
                </blockquote>
              </div>
              <figcaption className="relative mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="text-[12px] text-ivory">{featured.attribution}</p>
                  <p className="label mt-1 text-silver-dim">{featured.context}</p>
                </div>
                <span className="pill text-[8px] text-silver-dim">Concept note</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5 lg:gap-5">
            {rest.map((item, index) => (
              <Reveal key={item.id} delay={0.08 + index * 0.06}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-graphite/15 p-5 sm:p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="label text-silver-dim">
                        Note {String(index + 2).padStart(2, "0")}
                      </span>
                      <span className="label text-silver-dim">Illustrative</span>
                    </div>
                    <blockquote className="mt-5 text-[15px] leading-[1.5] tracking-[-0.015em] text-silver sm:text-[16px]">
                      “{item.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-[11px] text-ivory">{item.attribution}</p>
                    <p className="label mt-1 text-silver-dim">{item.context}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-line py-3.5">
        <div className="marquee-track flex w-max" aria-hidden="true">
          {strip}
          {strip}
        </div>
        <span className="sr-only">
          All listening notes are illustrative concept content, not verified reviews.
        </span>
      </div>
    </section>
  );
}
