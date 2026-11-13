import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_70%_20%,rgba(130,113,255,0.08),transparent_65%)]"
        />
        <div className="grain-local" aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-silver-dim">
            <Link href="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-silver">{eyebrow}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel index="01" tone="violet">
                {eyebrow}
              </SectionLabel>
              <h1 className="display mt-6 text-[clamp(2.75rem,6.4vw,6.5rem)] text-ivory">{title}</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="copy max-w-md">{intro}</p>
              <p className="label mt-6 text-silver-dim">{updated}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="label text-silver-dim">On this page</p>
              <ol className="mt-5 space-y-3">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-baseline gap-3 text-[13px] text-silver transition-colors hover:text-ivory"
                    >
                      <span className="label text-silver-dim tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-ivory/30">
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border-t border-line pt-6">
                <p className="text-[12px] leading-relaxed text-silver-dim">
                  Questions about this page? The{" "}
                  <Link href="/support" className="text-ivory underline decoration-line underline-offset-4 hover:decoration-ivory/60">
                    support desk
                  </Link>{" "}
                  is a local-only concept demo.
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="space-y-14 md:space-y-16">
              {sections.map((section, index) => (
                <Reveal key={section.id} delay={index * 0.03}>
                  <section id={section.id} className="scroll-mt-28">
                    <div className="flex items-baseline gap-4 border-b border-line pb-4">
                      <span className="label text-violet-soft tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium tracking-[-0.03em] text-ivory">
                        {section.title}
                      </h2>
                    </div>
                    <div className="mt-6 space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="copy max-w-2xl">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="label text-silver-dim">VYRA — concept build v1.0</p>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[13px] text-ivory transition-colors hover:text-violet-soft"
              >
                Return to the experience
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
