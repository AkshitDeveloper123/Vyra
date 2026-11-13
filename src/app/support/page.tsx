import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LifeBuoy, Package, ShieldCheck, Sparkles } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/support/ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/data/faqs";
import { CONCEPT_NOTE } from "@/data/product";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Concept support for VYRA ONE: frequently asked questions, shipping and returns context, care guidance and a local-only contact form.",
};

const QUICK_LINKS = [
  {
    href: "#faq",
    label: "FAQ",
    note: "Eight answers on the concept",
    icon: LifeBuoy,
  },
  {
    href: "#shipping",
    label: "Shipping & returns",
    note: "Illustrative policy only",
    icon: Package,
  },
  {
    href: "#care",
    label: "Care",
    note: "Cushions, cleaning, storage",
    icon: Sparkles,
  },
  {
    href: "#contact",
    label: "Contact",
    note: "A local-only demo form",
    icon: ShieldCheck,
  },
];

const CARE = [
  {
    title: "Cushions",
    body: "In the concept, cushions are magnetically mounted and replaceable. Wipe the textile with a soft, barely damp cloth; avoid saturating the memory core or using solvent cleaners.",
  },
  {
    title: "Surfaces",
    body: "Anodised aluminium prefers a dry microfibre cloth. For fingerprints, breathe lightly on the surface and wipe with the grain. Abrasive polishes would dull the bead-blasted finish.",
  },
  {
    title: "Storage",
    body: "Rest the cups flat rather than compressing the band. The woven pouch is for travel, not for stacking weight. Keep away from prolonged direct heat and sunlight.",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_75%_25%,rgba(130,113,255,0.11),transparent_65%)]"
        />
        <div className="grain-local" aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-silver-dim">
            <Link href="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-silver">Support</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="pill border-violet/30 bg-violet/[0.06] text-violet-soft">
                <span className="h-1 w-1 rounded-full bg-violet shadow-[0_0_8px_#8271ff]" />
                Concept support
              </span>
              <h1 className="display mt-6 text-[clamp(3rem,8.4vw,8.4rem)]">
                HOW CAN
                <br />
                WE <span className="text-silver/40">HELP?</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="copy max-w-sm text-[14px] md:text-[15px]">
                This is a self-contained prototype. The answers below explain the concept clearly —
                including what is real (very little) and what is demonstration.
              </p>
              <p className="label mt-5 text-silver-dim">No orders / no inbox / no external services</p>
            </div>
          </div>

          <div className="mt-12 grid gap-2 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-graphite/15 p-4 transition-colors hover:border-ivory/30 hover:bg-graphite/30"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-silver transition-colors group-hover:text-ivory">
                    <Icon size={15} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-ivory">{link.label}</span>
                    <span className="mt-0.5 block text-[10px] text-silver-dim">{link.note}</span>
                  </span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="shrink-0 text-silver-dim transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ivory"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionLabel index="01">FAQ</SectionLabel>
                <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)]">
                  THE HONEST
                  <br />
                  <span className="text-silver/40">ANSWERS.</span>
                </h2>
                <p className="copy mt-6 max-w-sm text-[13px]">
                  If something is not covered here, the contact form below validates locally and
                  confirms on-screen. It does not send anything.
                </p>
                <a
                  href="#contact"
                  className="group mt-6 inline-flex items-center gap-2 text-[12px] text-ivory"
                >
                  <span className="link-underline">Go to contact</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={FAQS} defaultOpen="concept" />
              <p className="mt-4 text-[10px] leading-relaxed text-silver-dim">{CONCEPT_NOTE}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="shipping" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="02">Shipping & returns</SectionLabel>
            <p className="label text-silver-dim">Illustrative policy / no fulfilment</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-graphite/20 p-6 sm:p-8">
                <p className="label text-violet-soft">Concept delivery</p>
                <h3 className="display mt-4 text-[clamp(1.8rem,3vw,2.6rem)]">
                  COMPLIMENTARY,
                  <br />
                  CARBON-BALANCED.
                </h3>
                <p className="copy mt-5 max-w-md text-[13px]">
                  In this concept, VYRA ONE would ship worldwide from a single studio partner with
                  complimentary carbon-balanced delivery. Nothing is actually shipped.
                </p>
                <dl className="mt-6 divide-y divide-line border-t border-line">
                  <div className="flex items-center justify-between py-3 text-[12px]">
                    <dt className="text-silver">Europe (illustrative)</dt>
                    <dd className="text-ivory">2–4 working days</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 text-[12px]">
                    <dt className="text-silver">Rest of world (illustrative)</dt>
                    <dd className="text-ivory">4–8 working days</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 text-[12px]">
                    <dt className="text-silver">Tracking</dt>
                    <dd className="text-ivory">Not applicable — demo</dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-line bg-graphite/20 p-6 sm:p-8">
                <p className="label text-violet-soft">Returns position</p>
                <h3 className="display mt-4 text-[clamp(1.8rem,3vw,2.6rem)]">
                  A 30-DAY
                  <br />
                  LISTENING WINDOW.
                </h3>
                <p className="copy mt-5 max-w-md text-[13px]">
                  The concept policy is simple: use the object properly. If it is not for you, return
                  it within 30 days in any condition short of damage.
                </p>
                <p className="mt-5 rounded-xl border border-line bg-ink/40 p-4 text-[11px] leading-relaxed text-silver">
                  This is illustrative copy for the prototype, not a contractual offer. No returns
                  process, address or refund mechanism exists.
                </p>
                <p className="label mt-5 text-silver-dim">
                  Warranty concept: two years, transferable, no registration required
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="care" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="03">Care</SectionLabel>
            <p className="label text-silver-dim">Concept guidance</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.4rem,5.6vw,5.2rem)] lg:col-span-7">
              KEEP IT
              <br />
              <span className="text-silver/40">SIMPLE.</span>
            </h2>
            <p className="copy max-w-md text-[14px] lg:col-span-5">
              No special rituals. The object is designed to be maintained with a cloth, a little
              patience and replaceable parts.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CARE.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-graphite/15 p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[17px] tracking-[-0.02em] text-ivory">{item.title}</h3>
                    <span className="label text-silver-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-silver">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-line py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionLabel index="04">Contact</SectionLabel>
              <h2 className="display mt-6 text-[clamp(2.4rem,4.8vw,4.4rem)]">
                LEAVE A
                <br />
                <span className="text-silver/40">NOTE.</span>
              </h2>
              <p className="copy mt-6 max-w-md text-[14px]">
                The form validates in your browser and confirms on-screen. It does not send email,
                store your message on a server or contact any external service.
              </p>

              <div className="mt-8 space-y-4 border-t border-line pt-6">
                <div>
                  <p className="label text-silver-dim">Concept studio</p>
                  <p className="mt-1.5 text-[13px] text-ivory">VYRA Design Studio — fictional</p>
                </div>
                <div>
                  <p className="label text-silver-dim">Correspondence</p>
                  <p className="mt-1.5 text-[13px] text-silver">
                    No inbox is monitored. This prototype has no contact address by design.
                  </p>
                </div>
                <div>
                  <p className="label text-silver-dim">Response time</p>
                  <p className="mt-1.5 text-[13px] text-silver">
                    Not applicable — nothing is transmitted.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="label text-silver-dim">Still curious?</p>
            <p className="mt-2 max-w-md text-[14px] text-silver">
              Read how the concept was designed, or configure the object yourself.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/our-story" className="btn btn-ghost btn-sm">
              Our story
            </Link>
            <Link href="/product" className="btn btn-sm">
              Explore VYRA ONE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
