"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeadphonesPoster } from "@/components/three/HeadphonesPoster";
import { useFinish } from "@/components/product/FinishProvider";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FinalCTA() {
  const { finish } = useFinish();

  return (
    <section
      id="configure"
      aria-labelledby="final-title"
      className="relative overflow-hidden border-t border-line"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_72%_50%,rgba(130,113,255,0.16),transparent_65%)]"
      />
      <div className="grain-local" aria-hidden="true" />

      <div className="shell relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <SectionLabel index="08">Begin</SectionLabel>

            <RevealText
              as="h2"
              lines={["HEAR BEYOND", "THE FRAME."]}
              className="display mt-7 text-[clamp(3rem,7.4vw,7.2rem)]"
              lineClassName={["", "text-silver/40"]}
            />

            <Reveal delay={0.1}>
              <p className="copy mt-7 max-w-md text-[14px] md:text-[15px]">
                One object, three finishes, a single listening philosophy. Configure VYRA ONE and
                explore the concept in full.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/product#configurator" magnetic>
                  Configure VYRA ONE
                  <ArrowIcon />
                </Button>
                <Button href="/technology" variant="ghost">
                  Explore the technology
                </Button>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
                <p className="text-[14px] text-ivory">
                  From $399
                  <span className="ml-2 label text-silver-dim">Concept pricing</span>
                </p>
                <Link
                  href="/support#faq"
                  className="group inline-flex items-center gap-2 text-[12px] text-silver transition-colors hover:text-ivory"
                >
                  <span className="link-underline">Questions before you begin?</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <p className="mt-5 max-w-md text-[10px] leading-relaxed text-silver-dim">
                VYRA is a fictional concept brand. No product is sold, no payment is collected and
                all specifications are illustrative.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={18}>
            <div className="relative mx-auto max-w-[520px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(130,113,255,0.22),transparent)] blur-2xl"
              />
              <div className="float-y relative">
                <HeadphonesPoster
                  finish={finish}
                  label={`VYRA ONE in ${finish.name}, concept illustration`}
                  className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4">
                <div>
                  <p className="label text-silver-dim">Shown in</p>
                  <p className="mt-1 text-[13px] text-ivory">{finish.name}</p>
                </div>
                <p className="label text-silver-dim">VYRA ONE / concept edition</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
