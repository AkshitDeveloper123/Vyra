"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useUI } from "@/components/ui/UIProvider";
import { useFinish } from "@/components/product/FinishProvider";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const { menuOpen, closeMenu, openSearch } = useUI();
  const { finishes, finishId, setFinish } = useFinish();
  const pathname = usePathname();
  const trapRef = useFocusTrap<HTMLDivElement>(menuOpen);
  useLockBodyScroll(menuOpen);

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink lg:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_110%,rgba(130,113,255,0.18),transparent_70%)]"
          />
          <div className="grain-local" />

          <div className="shell relative flex min-h-[100svh] flex-col pb-10 pt-6">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ivory transition-colors hover:bg-ivory/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              >
                <X size={18} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="mt-14 flex-1">
              <ul>
                {NAV_LINKS.map((link, index) => {
                  const active =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.18 + index * 0.055,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-line"
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex items-baseline justify-between py-4"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="label text-silver-dim">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "display text-[38px] leading-[1.05] tracking-[-0.045em] transition-colors",
                              active ? "text-ivory" : "text-silver group-hover:text-ivory",
                            )}
                          >
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.3}
                          aria-hidden="true"
                          className="text-silver-dim transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ivory"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.button
                type="button"
                onClick={openSearch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 flex w-full items-center justify-between rounded-full border border-line-strong px-5 py-3.5 text-left text-[13px] text-silver"
              >
                <span className="flex items-center gap-3">
                  <Search size={15} aria-hidden="true" />
                  Search VYRA
                </span>
                <span className="label text-silver-dim">⌘K</span>
              </motion.button>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <p className="label mb-4 text-silver-dim">Finish — {finishes.find((f) => f.id === finishId)?.name}</p>
              <div className="flex items-center gap-3">
                {finishes.map((finish) => (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setFinish(finish.id)}
                    aria-label={`Select ${finish.name} finish`}
                    aria-pressed={finishId === finish.id}
                    className={cn(
                      "h-9 w-9 rounded-full border transition-all duration-300",
                      finishId === finish.id
                        ? "scale-110 border-ivory/70"
                        : "border-white/10 hover:border-white/30",
                    )}
                    style={{
                      background: `radial-gradient(circle at 32% 28%, ${finish.swatchEdge}, ${finish.swatch} 55%, #0a0b10)`,
                    }}
                  />
                ))}
              </div>

              <Link
                href="/product"
                onClick={closeMenu}
                className="btn mt-8 w-full"
              >
                Explore VYRA ONE
                <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
              </Link>

              <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                <p className="label text-silver-dim">© 2026 VYRA</p>
                <p className="label text-silver-dim">Fictional concept brand</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
