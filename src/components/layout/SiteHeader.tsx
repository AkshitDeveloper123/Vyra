"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { useUI } from "@/components/ui/UIProvider";
import { useScrolled } from "@/hooks/useScrolled";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled(24);
  const { count, openCart, hydrated, isOpen } = useCart();
  const { openSearch, openMenu, menuOpen } = useUI();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "overflow-hidden border-b border-line/60 bg-ink/80 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "max-h-0 opacity-0" : "max-h-9 opacity-100",
        )}
      >
        <div className="shell flex h-[34px] items-center justify-between">
          <p className="label text-silver-dim">
            VYRA ONE <span className="mx-2 text-violet">/</span> Concept Edition
          </p>
          <p className="label hidden text-silver-dim sm:block">
            Complimentary concept delivery — worldwide
          </p>
          <p className="label text-silver-dim sm:hidden">EST. 2021</p>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-line bg-ink/70 backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500",
            scrolled ? "h-[62px]" : "h-[76px]",
          )}
        >
          <div className="flex items-center">
            <Logo />
          </div>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "link-underline relative text-[13px] tracking-[-0.005em] transition-colors duration-300",
                        active ? "text-ivory" : "text-silver hover:text-ivory",
                      )}
                      data-active={active}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-[9px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-violet shadow-[0_0_8px_#8271ff]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search VYRA"
              className="group flex h-9 items-center gap-2 rounded-full px-2.5 text-silver transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              <Search size={17} strokeWidth={1.5} aria-hidden="true" />
              <span className="label hidden text-silver-dim xl:inline">⌘K</span>
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open shopping bag${hydrated && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
              aria-expanded={isOpen}
              aria-controls="cart-drawer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full text-silver transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              <ShoppingBag size={17} strokeWidth={1.5} aria-hidden="true" />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-violet px-1 font-mono text-[9px] leading-none text-white">
                  {count}
                </span>
              )}
            </button>

            <div className="ml-1 hidden xl:block">
              <Button href="/product" size="sm">
                Explore VYRA ONE
                <span className="ml-1 h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
              </Button>
            </div>

            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="ml-0.5 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet lg:hidden"
            >
              <span className="block h-px w-[18px] bg-current" />
              <span className="block h-px w-[18px] bg-current" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
