"use client";

import {
  BookOpen,
  Calendar,
  ChevronRight,
  Refrigerator,
  Search,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
import { shot, Themed } from "./themed-shot";

type Tab = "today" | "kitchen" | "recipes" | "trends";
type Screen = "today" | "fridge" | "grocery" | "recipes" | "trends";

const TABS: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "kitchen", label: "Kitchen" },
  { id: "recipes", label: "Recipes" },
  { id: "trends", label: "Trends" },
];

const DEFAULT_SCREEN: Record<Tab, Screen> = {
  today: "today",
  kitchen: "fridge",
  recipes: "recipes",
  trends: "trends",
};

const SCREENS: Screen[] = ["today", "fridge", "grocery", "recipes", "trends"];

type Row = { label: string; text: string; screen?: "fridge" | "grocery" };

const COPY: Record<Tab, { title: string; rows: Row[] }> = {
  today: {
    title: "What you ate, at a glance.",
    rows: [
      {
        label: "The gauge",
        text: "Calories left, split by protein, carbs and fat.",
      },
      {
        label: "Meals",
        text: "Breakfast to snacks, with each food’s macros.",
      },
      {
        label: "The rest",
        text: "Water, fiber, sugar, caffeine and alcohol if you track them.",
      },
    ],
  },
  kitchen: {
    title: "Know what’s in the house.",
    rows: [
      {
        label: "Fridge",
        text: "Fridge, freezer and pantry, with what to use soon up top.",
        screen: "fridge",
      },
      {
        label: "Groceries",
        text: "One list per store, sorted by aisle.",
        screen: "grocery",
      },
      {
        label: "Usuals",
        text: "The things you always buy, restocked on schedule.",
      },
    ],
  },
  recipes: {
    title: "Cook from what you have.",
    rows: [
      { label: "Paste a link", text: "Foodable reads the recipe for you." },
      {
        label: "Cookable now",
        text: "Filters to what the fridge can cover.",
      },
      {
        label: "Cook",
        text: "Ingredients come out of stock, a serving gets logged.",
      },
    ],
  },
  trends: {
    title: "See the week, not just the day.",
    rows: [
      { label: "Streaks", text: "Days logged and how many in a row." },
      { label: "Averages", text: "Each macro against your goal." },
      { label: "Weight", text: "The line, without the guilt." },
    ],
  },
};

const TAB_BAR: { tab: Tab; label: string; Icon: LucideIcon }[] = [
  { tab: "today", label: "Today", Icon: Calendar },
  { tab: "kitchen", label: "Kitchen", Icon: Refrigerator },
  { tab: "recipes", label: "Recipes", Icon: BookOpen },
  { tab: "trends", label: "Trends", Icon: TrendingUp },
];

// A 1px transparent GIF. It makes the Iphone frame punch its screen out of the
// bezel (it only does that when it has media), so the live screen below shows.
const BLANK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// The Iphone frame's screen rectangle, as percentages of the frame. Copied
// from the geometry constants at the top of src/components/ui/iphone.tsx:
// re-check these if that file is ever re-pulled from the registry.
const SCREEN_BOX = {
  left: `${(21.25 / 433) * 100}%`,
  top: `${(19.25 / 882) * 100}%`,
  width: `${(389.5 / 433) * 100}%`,
  height: `${(843.5 / 882) * 100}%`,
  borderRadius: `${(55.75 / 389.5) * 100}% / ${(55.75 / 843.5) * 100}%`,
};

export function Tour() {
  const [{ tab, screen }, setState] = useState<{ tab: Tab; screen: Screen }>({
    tab: "today",
    screen: "today",
  });
  const scroller = useRef<HTMLDivElement>(null);

  function show(nextTab: Tab, nextScreen?: Screen) {
    setState({ tab: nextTab, screen: nextScreen ?? DEFAULT_SCREEN[nextTab] });
    scroller.current?.scrollTo({ top: 0 });
  }

  const copy = COPY[tab];

  return (
    <section id="tour" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        <Reveal inView>
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end md:gap-5">
            <h2 className="max-w-[16ch] text-[34px] leading-[1.05] font-bold md:text-[52px]">
              One app for the whole kitchen.
            </h2>
            <div
              role="tablist"
              aria-label="Rooms of the app"
              className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-glass p-[5px] backdrop-blur-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tour-tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls="tour-panel"
                  onClick={() => show(t.id)}
                  className={cn(
                    "inline-flex h-9 shrink-0 cursor-pointer items-center rounded-full px-4 text-sm transition-colors",
                    tab === t.id
                      ? "bg-brand font-semibold text-on-brand"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal inView delay={0.1}>
          <div className="mt-11 grid items-center gap-7 md:grid-cols-2 md:gap-12 [&>*]:min-w-0">
            <div
              key={tab}
              role="tabpanel"
              id="tour-panel"
              aria-labelledby={`tour-tab-${tab}`}
              className="motion-safe:animate-in fade-in slide-in-from-top-1.5 fill-mode-both duration-300"
            >
              <span className="text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
                {TABS.find((t) => t.id === tab)?.label}
              </span>
              <h3 className="mt-2.5 text-[34px] leading-[1.1] font-bold">
                {copy.title}
              </h3>
              <ul className="mt-[22px]">
                {copy.rows.map((row) => {
                  const body = (
                    <>
                      <b
                        className={cn(
                          "min-w-[120px] shrink-0 font-medium transition-colors",
                          row.screen && screen === row.screen
                            ? "text-brand-text"
                            : "text-foreground",
                        )}
                      >
                        {row.label}
                      </b>
                      <span>{row.text}</span>
                    </>
                  );
                  return (
                    <li key={row.label} className="border-t border-line">
                      {row.screen ? (
                        <button
                          type="button"
                          aria-pressed={screen === row.screen}
                          onClick={() => show("kitchen", row.screen)}
                          className="-mx-2.5 flex w-[calc(100%+20px)] cursor-pointer items-baseline gap-3 rounded-[10px] px-2.5 py-3 text-left text-muted-foreground transition-colors hover:bg-raised"
                        >
                          {body}
                          <ChevronRight
                            aria-hidden="true"
                            className="ml-auto size-4 shrink-0 self-center text-faint"
                          />
                        </button>
                      ) : (
                        <div className="flex gap-3 py-3 text-muted-foreground">
                          {body}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid justify-items-center gap-3.5">
              <div className="relative w-[250px] md:w-[300px]">
                {/* The live screen sits behind the frame, which has the screen
                    punched out, so the island and bezel draw on top. */}
                <div
                  className="absolute z-0 overflow-hidden bg-background"
                  style={SCREEN_BOX}
                >
                  <div
                    ref={scroller}
                    className="absolute inset-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {SCREENS.map((name) => (
                      <div
                        key={name}
                        hidden={name !== screen}
                        className="motion-safe:animate-in fade-in slide-in-from-top-1.5 fill-mode-both duration-300"
                      >
                        <Themed
                          light={
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={shot("phone", name, "light")}
                              alt={`The ${name} screen of the Foodable app`}
                              loading="lazy"
                              className="block h-auto w-full"
                            />
                          }
                          dark={
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={shot("phone", name, "dark")}
                              alt={`The ${name} screen of the Foodable app`}
                              loading="lazy"
                              className="block h-auto w-full"
                            />
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    role="group"
                    aria-label="App tabs"
                    className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-glass p-1 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur-lg"
                  >
                    {TAB_BAR.slice(0, 2).map((b) => (
                      <TabButton
                        key={b.tab}
                        {...b}
                        active={tab === b.tab}
                        onSelect={() => show(b.tab)}
                      />
                    ))}
                    <span
                      aria-hidden="true"
                      className="grid h-[30px] w-[46px] place-items-center rounded-full bg-brand text-on-brand"
                    >
                      <Search className="size-4" />
                    </span>
                    {TAB_BAR.slice(2).map((b) => (
                      <TabButton
                        key={b.tab}
                        {...b}
                        active={tab === b.tab}
                        onSelect={() => show(b.tab)}
                      />
                    ))}
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[7px] left-1/2 h-[3px] w-[90px] -translate-x-1/2 rounded-[3px] bg-foreground opacity-90"
                  />
                </div>
                <Iphone src={BLANK} className="pointer-events-none" />
              </div>
              <p className="flex items-center gap-2 text-[13px] text-faint">
                <Smartphone aria-hidden="true" className="size-4" />
                Tap the tabs. On a phone it&apos;s a web app: add it to your
                home screen and it opens like any other app.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TabButton({
  label,
  Icon,
  active,
  onSelect,
}: {
  label: string;
  Icon: LucideIcon;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onSelect}
      className={cn(
        "relative grid h-[30px] w-9 cursor-pointer place-items-center rounded-full transition-colors",
        active ? "text-foreground" : "text-faint",
      )}
    >
      <Icon aria-hidden="true" className="size-4" />
      {active ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-px size-[3px] rounded-full bg-brand"
        />
      ) : null}
    </button>
  );
}
