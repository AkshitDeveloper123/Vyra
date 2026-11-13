import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { FOOTER_COLUMNS } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(130,113,255,0.1),transparent)] blur-2xl"
      />

      <div className="shell relative pt-16 md:pt-24">
        <div className="grid gap-12 border-b border-line pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-20">
          <div>
            <SectionLabel index="—">Correspondence</SectionLabel>
            <h2 className="display mt-7 text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[0.92]">
              STAY IN
              <br />
              THE FRAME.
            </h2>
            <p className="copy mt-5 max-w-sm text-[14px]">
              Occasional notes on listening, material studies and the next VYRA concept. No noise
              — only signal.
            </p>
          </div>
          <div className="flex flex-col justify-end lg:pb-2">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <Logo large />
            <p className="mt-5 max-w-[240px] text-[12px] leading-relaxed text-silver">
              A concept audio house exploring spatial sound, material honesty and the rituals of
              listening.
            </p>
            <p className="mt-6 max-w-[240px] text-[10px] leading-relaxed text-silver-dim">
              No social accounts. This is a self-contained concept build.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="label text-silver-dim">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-silver transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-[10px] text-silver-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VYRA. A fictional concept brand — no products are sold.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
            <Link href="/support" className="transition-colors hover:text-ivory">
              Support
            </Link>
            <span className="hidden sm:inline">Concept build — v1.0</span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative select-none px-[clamp(20px,5vw,72px)]">
        <p className="display-tight bg-gradient-to-b from-ivory/[0.13] to-ivory/[0.01] bg-clip-text pb-2 text-center text-[clamp(5rem,19vw,19rem)] text-transparent">
          VYRA
        </p>
      </div>
    </footer>
  );
}
