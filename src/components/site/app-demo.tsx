"use client";

import { useRef, useState } from "react";
import {
  BookOpen,
  Calendar,
  Refrigerator,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

import { shot, Themed } from "./themed-shot";

type Page = "today" | "kitchen" | "groceries" | "recipes" | "trends";

const ALT: Record<Page, string> = {
  today: "Foodable's Today page: calories left, macros and meals",
  kitchen: "Foodable's Kitchen page: the fridge, freezer and pantry",
  groceries: "Foodable's Groceries page: one list per store",
  recipes: "Foodable's Recipes page",
  trends: "Foodable's Trends page: streaks, averages and weight",
};

const MAIN: { page: Page; label: string; Icon: LucideIcon }[] = [
  { page: "today", label: "Today", Icon: Calendar },
  { page: "kitchen", label: "Kitchen", Icon: Refrigerator },
  { page: "recipes", label: "Recipes", Icon: BookOpen },
  { page: "trends", label: "Trends", Icon: TrendingUp },
];

const BUTTON =
  "flex h-8 flex-none cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] whitespace-nowrap transition-colors hover:bg-raised/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:h-[34px]";

/**
 * The app window in the hero. Today is in the server HTML (preloaded); the
 * sidebar swaps the page, and the URL text, on the client.
 */
export function AppDemo() {
  const [page, setPage] = useState<Page>("today");
  const viewRef = useRef<HTMLDivElement>(null);
  const kitchenOpen = page === "kitchen" || page === "groceries";

  // Every click starts the page at the top, even a click on the page already
  // shown (Overview while on Kitchen), as the mockup does.
  function go(p: Page) {
    setPage(p);
    if (viewRef.current) viewRef.current.scrollTop = 0;
  }

  return (
    <div className="relative mx-4 rounded-t-[22px] border border-b-0 border-line bg-background text-left shadow-[0_-30px_80px_-40px_rgba(40,207,139,0.35)] md:mx-auto md:w-[calc(100%-48px)] md:max-w-[1120px]">
      <BorderBeam
        className="motion-reduce:hidden"
        size={220}
        duration={9}
        colorFrom="#28cf8b"
        colorTo="#b6f0d6"
      />

      <div className="flex h-[42px] items-center gap-[7px] rounded-t-[22px] border-b border-line bg-panel px-4">
        <i className="size-2.5 rounded-full bg-track" />
        <i className="size-2.5 rounded-full bg-track" />
        <i className="size-2.5 rounded-full bg-track" />
        <span className="ml-1.5 flex h-[26px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-raised px-3.5 font-mono text-xs text-faint md:mx-auto md:ml-auto md:min-w-[300px] md:flex-none">
          <span className="truncate">
            localhost:3000/
            <b className="font-normal text-muted-foreground">
              {page === "groceries" ? "kitchen/groceries" : page}
            </b>
          </span>
        </span>
        <span className="hidden items-center gap-1.5 text-xs text-faint md:flex">
          <span className="relative flex size-[7px]">
            <span className="absolute inset-0 rounded-full bg-brand/40 motion-safe:animate-ping" />
            <span className="relative size-[7px] rounded-full bg-brand" />
          </span>
          Click around, it&rsquo;s the app
        </span>
      </div>

      <div className="grid h-[440px] grid-cols-1 grid-rows-[auto_minmax(0,1fr)] md:h-[560px] md:grid-cols-[200px_minmax(0,1fr)] md:grid-rows-none">
        <aside className="flex min-w-0 flex-row gap-0.5 overflow-x-auto border-b border-line p-2 text-[13px] text-muted-foreground [scrollbar-width:none] md:flex-col md:overflow-visible md:border-r md:border-b-0 md:px-2.5 md:py-3.5 [&::-webkit-scrollbar]:hidden">
          <div className="hidden items-center gap-[9px] px-2 pt-1.5 pb-3.5 md:flex">
            <span className="grid size-7 flex-none place-items-center rounded-full bg-raised text-[11px] font-semibold text-foreground">
              F
            </span>
            <div>
              <b className="block text-[12.5px] leading-tight font-semibold text-foreground">
                The Flow household
              </b>
              <small className="text-[11px] text-faint">3 members</small>
            </div>
          </div>

          {MAIN.map(({ page: p, label, Icon }) => {
            const on = p === page || (p === "kitchen" && kitchenOpen);
            return (
              <div key={p} className="contents">
                <button
                  type="button"
                  aria-pressed={on}
                  aria-expanded={p === "kitchen" ? kitchenOpen : undefined}
                  onClick={() => go(p)}
                  className={cn(
                    BUTTON,
                    on && "bg-raised font-medium text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </button>
                {p === "kitchen" && (
                  <div
                    className={cn(
                      "grid gap-0.5 overflow-hidden pl-[26px] transition-[max-height] duration-300 max-md:contents",
                      kitchenOpen ? "max-h-20" : "max-h-0 md:invisible",
                    )}
                  >
                    <button
                      type="button"
                      aria-pressed={page === "kitchen"}
                      onClick={() => go("kitchen")}
                      className={cn(
                        BUTTON,
                        "md:h-7 md:text-[12.5px] max-md:hidden",
                        page === "kitchen" && "text-foreground",
                      )}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      aria-pressed={page === "groceries"}
                      onClick={() => go("groceries")}
                      className={cn(
                        BUTTON,
                        "md:h-7 md:text-[12.5px]",
                        page === "groceries" &&
                          "text-foreground max-md:bg-raised",
                      )}
                    >
                      Groceries
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <div className="hidden flex-1 md:block" />
          <div className="mt-1.5 hidden items-center gap-[9px] border-t border-line px-2 pt-2.5 pb-1 md:flex">
            <span className="grid size-7 flex-none place-items-center rounded-full bg-raised text-[11px] font-semibold text-foreground">
              EF
            </span>
            <div>
              <b className="block text-[12.5px] leading-tight font-semibold text-foreground">
                Ethan Flow
              </b>
              <small className="text-[11px] text-faint">Owner</small>
            </div>
          </div>
        </aside>

        <div
          ref={viewRef}
          className="relative min-h-0 min-w-0 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            key={page}
            className="motion-safe:animate-in motion-safe:duration-[350ms] motion-safe:fade-in motion-safe:slide-in-from-bottom-[6px]"
          >
            <Themed
              light={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={shot("app", page, "light")}
                  alt={ALT[page]}
                  className="block w-[760px] max-w-none md:w-full"
                />
              }
              dark={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={shot("app", page, "dark")}
                  alt={ALT[page]}
                  className="block w-[760px] max-w-none md:w-full"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
