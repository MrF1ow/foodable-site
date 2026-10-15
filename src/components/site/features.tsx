"use client";

import {
  CookingPot,
  FileArchive,
  Refrigerator,
  Salad,
  ShoppingCart,
  Users,
} from "lucide-react";

import { AnimatedList } from "@/components/ui/animated-list";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { DOCS_URL, REPO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";
import { shot, Themed } from "./themed-shot";

const FRIDGE = [
  { name: "Eggs", meta: "6 each", tone: "soon", where: "Fridge" },
  { name: "Spinach", meta: "300 g", tone: "soon", where: "Fridge" },
  { name: "Milk", meta: "1 L", tone: "ok", where: "Fridge" },
  { name: "Greek yogurt", meta: "500 g", tone: "ok", where: "Fridge" },
  { name: "Frozen peas", meta: "1 bag", tone: "ok", where: "Freezer" },
  { name: "Rice", meta: "2 kg", tone: "ok", where: "Pantry" },
  { name: "Paper towels", meta: "3 rolls", tone: "ok", where: "Pantry" },
];

function FridgeTile({ f }: { f: (typeof FRIDGE)[number] }) {
  return (
    <figure className="w-40 rounded-xl border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{f.where}</span>
        {f.tone === "soon" ? (
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
            use soon
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-medium">{f.name}</p>
      <p className="text-sm text-muted-foreground">{f.meta}</p>
    </figure>
  );
}

const GROCERY = [
  { name: "Bananas", note: "Produce · Safeway" },
  { name: "Eggs", note: "have 6, need 12" },
  { name: "Lasagna noodles", note: "for lasagna" },
  { name: "Milk", note: "Dairy · Safeway" },
  { name: "Mozzarella", note: "for lasagna" },
];

function GroceryRow({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border bg-card px-3 py-2.5 shadow-sm">
      <span className="size-4 shrink-0 rounded-full border-2 border-brand" />
      <span className="text-sm font-medium">{name}</span>
      <span className="ml-auto truncate rounded-full bg-brand-soft px-2 py-0.5 text-[11px] text-brand">
        {note}
      </span>
    </div>
  );
}

function RecipeCard() {
  const ings = [
    ["Eggs", "6 each", true],
    ["Tomatoes", "800 g", true],
    ["Spinach", "150 g", true],
    ["Feta", "100 g", false],
  ] as const;
  return (
    <div className="absolute top-6 right-4 left-4 rounded-xl border bg-card p-4 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="flex items-baseline justify-between">
        <p className="font-heading font-semibold">Shakshuka</p>
        <p className="text-xs text-muted-foreground">serves 4 · 320 kcal</p>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm">
        {ings.map(([n, q, have]) => (
          <li key={n} className="flex items-center justify-between">
            <span className={cn(!have && "text-muted-foreground")}>{n}</span>
            <span
              className={cn(
                "text-xs",
                have ? "text-muted-foreground" : "font-medium text-brand",
              )}
            >
              {have ? q : "→ added to list"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HouseholdCard() {
  const people = [
    { name: "You", goal: "2,200 kcal", pct: 93 },
    { name: "Your partner", goal: "1,800 kcal", pct: 71 },
  ];
  return (
    <div className="absolute top-5 right-4 left-4 space-y-2 transition-transform duration-300 group-hover:scale-[1.02]">
      {people.map((p) => (
        <div key={p.name} className="rounded-xl border bg-card px-3 py-2.5 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{p.name}</span>
            <span className="text-xs text-muted-foreground">
              {p.pct}% of {p.goal}
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${p.pct}%` }}
            />
          </div>
        </div>
      ))}
      <p className="rounded-xl border border-dashed bg-card/60 px-3 py-2 text-xs text-muted-foreground">
        🥜 House rule: no peanuts. Lists and recipes respect it.
      </p>
    </div>
  );
}

function ExportCard() {
  const files = [
    "meals.csv",
    "meal_items.csv",
    "water.csv",
    "weight.csv",
    "goals.csv",
    "profile.csv",
  ];
  return (
    <div className="absolute top-6 right-4 left-4 flex flex-wrap gap-2 transition-transform duration-300 group-hover:scale-[1.02]">
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 font-mono text-xs text-on-brand">
        <FileArchive className="size-3.5" /> foodable-export.zip
      </span>
      {files.map((f) => (
        <span
          key={f}
          className="rounded-lg border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-sm"
        >
          {f}
        </span>
      ))}
      <span className="rounded-lg border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
        ← import CSVs from your old apps, too
      </span>
    </div>
  );
}

const fade =
  "[mask-image:linear-gradient(to_bottom,#000_55%,transparent_100%)]";

const CARDS = [
  {
    Icon: Refrigerator,
    name: "Fridge & pantry",
    description:
      "Everything in the house, by location, with quantities and what to use first.",
    href: REPO_URL,
    cta: "See the code",
    className: "lg:col-span-2",
    background: (
      <div className={cn("absolute inset-x-0 top-6", fade)}>
        <Marquee pauseOnHover className="[--duration:28s]">
          {FRIDGE.map((f) => (
            <FridgeTile key={f.name} f={f} />
          ))}
        </Marquee>
      </div>
    ),
  },
  {
    Icon: ShoppingCart,
    name: "Groceries",
    description:
      "Per-store lists sorted by section, checked against what you already have.",
    href: REPO_URL,
    cta: "See the code",
    className: "lg:col-span-1",
    background: (
      <div className={cn("absolute inset-x-4 top-4 h-[165px] overflow-hidden", fade)}>
        <AnimatedList delay={1600}>
          {GROCERY.map((g) => (
            <GroceryRow key={g.name} {...g} />
          ))}
        </AnimatedList>
      </div>
    ),
  },
  {
    Icon: CookingPot,
    name: "Recipes",
    description:
      "Real portions, batch cooking, and missing ingredients straight onto the list.",
    href: REPO_URL,
    cta: "See the code",
    className: "lg:col-span-1",
    background: <RecipeCard />,
  },
  {
    Icon: Salad,
    name: "Nutrition that’s actually complete",
    description:
      "Meals, water, weight, goals and trends, plus sugar, fiber, caffeine and alcohol if you want them.",
    href: REPO_URL,
    cta: "See the code",
    className: "lg:col-span-2",
    background: (
      <div
        className={cn(
          "absolute inset-x-6 top-6 h-[180px] overflow-hidden rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-[1.02]",
          fade,
        )}
      >
        <Themed
          // eslint-disable-next-line @next/next/no-img-element
          light={<img src={shot("nutrition", "light")} alt="" className="w-full" />}
          // eslint-disable-next-line @next/next/no-img-element
          dark={<img src={shot("nutrition", "dark")} alt="" className="w-full" />}
        />
      </div>
    ),
  },
  {
    Icon: Users,
    name: "Made for two (or more)",
    description:
      "Everyone gets their own goals and log. Allergies and dislikes apply to the whole house.",
    href: REPO_URL,
    cta: "See the code",
    className: "lg:col-span-1",
    background: <HouseholdCard />,
  },
  {
    Icon: FileArchive,
    name: "Your data, your way",
    description:
      "Export everything to a ZIP of plain CSVs anytime. Bring your history in from other apps.",
    href: DOCS_URL,
    cta: "Read the docs",
    className: "lg:col-span-2",
    background: <ExportCard />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Features"
          title="Everything the kitchen needs. Nothing it doesn’t."
        >
          Five parts that share one catalog of foods, so nothing gets typed
          twice and nothing falls through the cracks.
        </SectionHeading>
        <BlurFade inView delay={0.1}>
          <BentoGrid className="mt-14 auto-rows-[26rem] lg:auto-rows-[22rem] lg:grid-cols-3">
            {CARDS.map((c) => (
              <BentoCard key={c.name} {...c} />
            ))}
          </BentoGrid>
        </BlurFade>
      </div>
    </section>
  );
}
