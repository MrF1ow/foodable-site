import type { ReactNode } from "react";

import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

type SoonTone = "text-over" | "text-warn" | "text-faint";

const SOON: { when: string; tone: SoonTone; name: string; qty: string }[] = [
  { when: "Tomorrow", tone: "text-over", name: "Salmon", qty: "1 lb" },
  { when: "2 days", tone: "text-warn", name: "Baby spinach", qty: "½ bag" },
  { when: "3 days", tone: "text-warn", name: "Cooked rice", qty: "3 cups" },
  { when: "5 days", tone: "text-faint", name: "Greek yogurt", qty: "12 oz" },
];

const LINES = [
  { name: "Kirkland 2% milk", qty: "1 gal", done: false },
  { name: "Large eggs", qty: "24", done: false },
  { name: "Olive oil", qty: "1 bottle", done: true },
];

const NUTRITION = [
  { label: "Water", pct: 53, bar: "bg-water", value: "1.6 / 3 L" },
  { label: "Fiber", pct: 47, bar: "bg-carbs", value: "18 / 38 g" },
  { label: "Sugar", pct: 62, bar: "bg-kcal", value: "31 / 50 g" },
  { label: "Caffeine", pct: 45, bar: "bg-fat", value: "180 / 400 mg" },
];

const FILES = ["meals.csv", "fridge.csv", "recipes.csv", "weight.csv"];

function Card({
  title,
  className,
  delay,
  children,
}: {
  title: string;
  className?: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <Reveal inView delay={delay} className={cn("min-w-0", className)}>
      <MagicCard
        className="h-full rounded-[20px] shadow-sm [&>div:first-child]:bg-panel [&>div:last-child]:h-full"
        gradientSize={300}
        gradientFrom="#28cf8b"
        gradientTo="#b6f0d6"
        gradientColor="#28cf8b"
        gradientOpacity={0.08}
      >
        <div className="flex h-full min-h-[290px] flex-col p-[26px] lg:min-h-0">
          <h3 className="text-xl font-bold">{title}</h3>
          {children}
        </div>
      </MagicCard>
    </Reveal>
  );
}

function Blurb({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1.5 max-w-[38ch] text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="relative border-t border-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal inView>
          <span className="text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
            Features
          </span>
          <h2 className="mt-3 max-w-[22ch] text-[34px] leading-[1.05] font-bold text-balance md:text-[52px]">
            The stuff we actually use, every day.
          </h2>
        </Reveal>

        <div className="mt-11 grid gap-3 lg:grid-cols-3 lg:grid-rows-[310px_310px_132px] [&>*]:min-w-0">
          <Card title="Fridge & pantry" delay={0} className="lg:col-span-2">
            <Blurb>
              Everything in the house, by location, with quantities and what to
              use first.
            </Blurb>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-5 sm:grid-cols-4">
              {SOON.map((s) => (
                <div key={s.name} className="rounded-2xl bg-raised p-4 text-sm">
                  <small className={cn("block text-[11.5px] font-medium", s.tone)}>
                    {s.when}
                  </small>
                  <b className="mt-1 mb-px block text-[15px] font-medium">
                    {s.name}
                  </b>
                  <span className="text-xs text-faint">{s.qty}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Grocery lists" delay={0.06}>
            <Blurb>One list per store, sorted by aisle.</Blurb>
            <div className="mt-auto pt-5">
              <div className="mb-2 flex gap-1.5">
                <span className="inline-flex h-7 items-center rounded-full bg-foreground px-3 text-[13px] text-background">
                  Costco 5
                </span>
                <span className="inline-flex h-7 items-center rounded-full bg-raised px-3 text-[13px] text-muted-foreground">
                  Trader Joe’s 3
                </span>
              </div>
              <ul>
                {LINES.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center gap-2.5 border-t border-line px-0.5 py-[9px] text-[13px] first:border-t-0"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-4 flex-none place-items-center rounded-full border-[1.5px] text-[10px]",
                        l.done
                          ? "border-brand bg-brand text-on-brand"
                          : "border-faint",
                      )}
                    >
                      {l.done ? "✓" : ""}
                    </span>
                    <span className={cn(l.done && "text-faint line-through")}>
                      {l.name}
                    </span>
                    <em className="ml-auto text-xs text-faint not-italic">
                      {l.qty}
                    </em>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card title="Recipes" delay={0.12}>
            <Blurb>
              Paste a link. Cook it and the ingredients come out of stock.
            </Blurb>
            <div className="mt-auto pt-5">
              <div className="rounded-2xl bg-raised p-3.5 text-[13px]">
                <small className="block text-[10.5px] font-medium tracking-[0.08em] text-faint uppercase">
                  Uses all three
                </small>
                <b className="mt-1 mb-0.5 block text-sm font-medium">
                  Salmon, rice &amp; spinach
                </b>
                <span className="text-xs text-faint">
                  25 min · 640 kcal per serving
                </span>
                <div aria-hidden className="mt-3 flex gap-1.5">
                  <span className="inline-flex h-8 flex-1 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-on-brand">
                    Cook it
                  </span>
                  <span className="inline-flex h-8 items-center justify-center rounded-full bg-panel px-[22px] text-[13px] font-semibold">
                    Plan
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Complete nutrition" delay={0.06}>
            <Blurb>
              Macros, water and weight, plus fiber, sugar, caffeine and alcohol.
            </Blurb>
            <div className="mt-auto grid gap-[11px] pt-5 text-xs text-muted-foreground">
              {NUTRITION.map((n) => (
                <div
                  key={n.label}
                  className="grid grid-cols-[62px_1fr_76px] items-center gap-2.5"
                >
                  <span>{n.label}</span>
                  <span
                    aria-hidden
                    className="h-1.5 overflow-hidden rounded-full bg-track"
                  >
                    <i
                      className={cn("block h-full rounded-full", n.bar)}
                      style={{ width: `${n.pct}%` }}
                    />
                  </span>
                  <span className="text-right text-foreground">{n.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Made for two (or more)" delay={0.12}>
            <Blurb>
              Everyone keeps their own goals and log. Allergies apply to the
              house.
            </Blurb>
            <div className="mt-auto grid gap-2 pt-5 text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="grid size-[30px] flex-none place-items-center rounded-full bg-raised text-[11px] font-semibold">
                  EF
                </span>
                You
                <em className="ml-auto text-xs text-faint not-italic">
                  2,421 kcal goal
                </em>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-[30px] flex-none place-items-center rounded-full bg-protein/20 text-[11px] font-semibold">
                  +1
                </span>
                Your partner
                <em className="ml-auto text-xs text-faint not-italic">
                  1,850 kcal goal
                </em>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-[30px] flex-none place-items-center rounded-full bg-over/20 text-[11px] font-semibold text-over">
                  !
                </span>
                Peanuts
                <em className="ml-auto text-xs text-faint not-italic">
                  whole house
                </em>
              </div>
            </div>
          </Card>

          <Reveal
            inView
            delay={0.18}
            className="min-w-0 lg:col-span-3"
          >
            <MagicCard
              className="h-full rounded-[20px] shadow-sm [&>div:first-child]:bg-panel [&>div:last-child]:h-full"
              gradientSize={300}
              gradientFrom="#28cf8b"
              gradientTo="#b6f0d6"
              gradientColor="#28cf8b"
              gradientOpacity={0.08}
            >
              <div className="flex h-full flex-col items-start gap-4 p-[26px] lg:flex-row lg:items-center lg:gap-8">
                <div>
                  <h3 className="text-xl font-bold">Take your data with you</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Export a ZIP of plain CSVs anytime. Bring your history in
                    from other apps.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 lg:ml-auto lg:justify-end">
                  {FILES.map((f) => (
                    <span
                      key={f}
                      className="inline-flex h-8 items-center rounded-[10px] bg-raised px-3 font-mono text-[12.5px] text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
