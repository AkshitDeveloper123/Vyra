"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useUI } from "@/components/ui/UIProvider";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { SEARCH_INDEX } from "@/data/search";
import { cn } from "@/lib/utils";
import type { SearchEntry } from "@/types";

function scoreEntry(entry: SearchEntry, query: string) {
  const q = query.toLowerCase();
  let score = 0;
  if (entry.title.toLowerCase().includes(q)) score += 5;
  if (entry.description.toLowerCase().includes(q)) score += 2;
  if (entry.category.toLowerCase().includes(q)) score += 1;
  for (const keyword of entry.keywords ?? []) {
    if (keyword.toLowerCase().includes(q)) score += 3;
  }
  return score;
}

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const trapRef = useFocusTrap<HTMLDivElement>(searchOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  useLockBodyScroll(searchOpen);

  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX.slice(0, 6);
    return SEARCH_INDEX.map((entry) => ({ entry, score: scoreEntry(entry, query.trim()) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((item) => item.entry);
  }, [query]);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      setSelected(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, closeSearch]);

  const go = (href: string) => {
    const [path, hash] = href.split("#");
    closeSearch();
    if (hash && (path === "" || path === pathname)) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return;
    }
    router.push(href);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((prev) => Math.min(prev + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && results[selected]) {
      event.preventDefault();
      go(results[selected].href);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            aria-hidden="true"
            className="fixed inset-0 bg-ink/85 backdrop-blur-2xl"
            onClick={closeSearch}
          />
          <div className="relative mx-auto mt-[10vh] w-[calc(100%-32px)] max-w-[700px] pb-10 sm:mt-[14vh]">
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="search-title"
              initial={{ opacity: 0, y: 22, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[22px] border border-line-strong bg-graphite/85 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
            >
              <h2 id="search-title" className="sr-only">
                Search VYRA
              </h2>
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <Search size={18} strokeWidth={1.4} className="shrink-0 text-silver" aria-hidden="true" />
                <input
                  ref={inputRef}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="search-results"
                  aria-autocomplete="list"
                  aria-activedescendant={
                    results[selected] ? `search-option-${selected}` : undefined
                  }
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search products, technology, support…"
                  className="w-full bg-transparent py-1 text-[16px] text-ivory outline-none placeholder:text-silver-dim"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="label shrink-0 text-silver-dim transition-colors hover:text-ivory"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-silver transition-colors hover:text-ivory"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>

              <div className="max-h-[52vh] overflow-y-auto p-2">
                {results.length > 0 ? (
                  <ul role="listbox" id="search-results" aria-label="Search results">
                    {results.map((entry, index) => (
                      <li
                        key={`${entry.href}-${entry.title}`}
                        id={`search-option-${index}`}
                        role="option"
                        aria-selected={index === selected}
                        onMouseMove={() => setSelected(index)}
                        onClick={() => go(entry.href)}
                        className={cn(
                          "group flex cursor-pointer items-start justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors",
                          index === selected ? "bg-ivory/[0.07]" : "hover:bg-ivory/[0.04]",
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <p className="text-[14px] text-ivory">{entry.title}</p>
                            <span className="label rounded-full border border-line px-2 py-0.5 text-[8px] text-silver-dim">
                              {entry.category}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-[12px] text-silver">
                            {entry.description}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.3}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-silver-dim transition-all group-hover:-translate-y-0.5 group-hover:text-ivory"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <p className="text-[15px] text-ivory">No results for “{query}”</p>
                    <p className="mx-auto mt-2 max-w-xs text-[12px] leading-relaxed text-silver">
                      Try “spatial”, “finish”, “specifications” or “support”. Or explore the full
                      product page.
                    </p>
                    <button
                      type="button"
                      onClick={() => go("/product")}
                      className="btn btn-ghost btn-sm mt-6"
                    >
                      Explore VYRA ONE
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-line px-5 py-3">
                <div className="flex items-center gap-4">
                  <span className="label flex items-center gap-1.5 text-silver-dim">
                    <kbd className="rounded border border-line px-1 py-0.5 text-[8px]">↑</kbd>
                    <kbd className="rounded border border-line px-1 py-0.5 text-[8px]">↓</kbd>
                    navigate
                  </span>
                  <span className="label hidden items-center gap-1.5 text-silver-dim sm:flex">
                    <kbd className="rounded border border-line px-1 py-0.5 text-[8px]">↵</kbd>
                    open
                  </span>
                </div>
                <span className="label flex items-center gap-1.5 text-silver-dim">
                  <kbd className="rounded border border-line px-1 py-0.5 text-[8px]">esc</kbd>
                  close
                </span>
              </div>
            </motion.div>
            <p className="label mt-4 text-center text-silver-dim">
              {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggested pages"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
