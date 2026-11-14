import { ArrowRight } from "lucide-react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { REPO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AppDemo } from "./app-demo";
import { GithubIcon } from "./github-icon";
import { Reveal } from "./reveal";
import { shot } from "./themed-shot";

const GREENS = ["#28cf8b", "#7ee2b8", "#14a86c", "#b6f0d6"];

// The gauge arcs draw in once on first paint. Without motion preference (or
// with reduced motion) there is no animation and they are fully drawn.
const GAUGE_CSS = `
@keyframes hero-arc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: no-preference) {
  .hero-arc { stroke-dasharray: 1; animation: hero-arc-draw 1.2s cubic-bezier(.3,.7,.2,1) both; }
}
`;

const ARCS = [
  { d: "M40 320 A280 280 0 0 1 84 169", color: "var(--protein)", delay: "0.15s" },
  { d: "M96 152 A280 280 0 0 1 215 60", color: "var(--carbs)", delay: "0.5s" },
  { d: "M236 53 A280 280 0 0 1 330 40", color: "var(--fat)", delay: "0.85s" },
];

const LEGEND = [
  { name: "Protein", value: 96, goal: 210, color: "bg-protein" },
  { name: "Carbs", value: 118, goal: 213, color: "bg-carbs" },
  { name: "Fat", value: 42, goal: 81, color: "bg-fat" },
];

// S M T W T F S, 1 to 7. Today is the 7th. `dot` is the day's marker colour.
const WEEK = [
  { letter: "S", day: 1, dot: "bg-kcal" },
  { letter: "M", day: 2, dot: "" },
  { letter: "T", day: 3, dot: "bg-kcal" },
  { letter: "W", day: 4, dot: "bg-brand" },
  { letter: "T", day: 5, dot: "bg-brand" },
  { letter: "F", day: 6, dot: "bg-brand" },
  { letter: "S", day: 7, dot: "bg-kcal", today: true },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 text-center md:pt-[126px]"
    >
      {/* The Today screenshot is the first image in the app window, just
          below the fold. React hoists these into <head>; `media` fetches only
          the twin for the system theme. */}
      <link
        rel="preload"
        as="image"
        href={shot("app", "today", "light")}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="preload"
        as="image"
        href={shot("app", "today", "dark")}
        media="(prefers-color-scheme: dark)"
      />
      <style>{GAUGE_CSS}</style>
      <DotPattern
        className={cn(
          "text-brand/35 [mask-image:radial-gradient(640px_circle_at_50%_30%,white,transparent)]",
        )}
      />
      <div className="pointer-events-none absolute top-[-220px] left-1/2 h-[480px] w-[760px] max-w-full -translate-x-1/2 rounded-full bg-brand/20 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Reveal delay={0.05}>
          <a
            href={REPO_URL}
            className="group inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-panel px-3 text-[13px]"
          >
            <span className="size-[7px] flex-none rounded-full bg-brand" />
            <AnimatedShinyText className="mx-0 inline-flex max-w-none items-center">
              Free, open source &amp; yours to host
              <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </a>
        </Reveal>

        {/* The headline sits inside the gauge: a track arc and one arc each
            for protein, carbs and fat, like the app's Today page. */}
        <div className="relative mx-auto mt-[22px] w-full max-w-[780px]">
          <svg
            viewBox="0 0 640 340"
            fill="none"
            aria-hidden
            className="block w-full"
          >
            <path
              d="M40 320 A280 280 0 0 1 600 320"
              stroke="var(--track)"
              strokeWidth="26"
              strokeLinecap="round"
            />
            {ARCS.map((arc) => (
              <path
                key={arc.d}
                className="hero-arc"
                pathLength={1}
                d={arc.d}
                stroke={arc.color}
                strokeWidth="26"
                strokeLinecap="round"
                style={{ animationDelay: arc.delay }}
              />
            ))}
          </svg>
          <div className="absolute inset-x-0 bottom-0.5 md:bottom-1.5">
            <h1 className="mx-auto max-w-[10ch] text-[40px] leading-[1.05] font-bold text-balance md:text-[66px]">
              Making food more <AuroraText colors={GREENS}>doable.</AuroraText>
            </h1>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground md:gap-x-7 md:text-sm">
            {LEGEND.map((m) => (
              <span key={m.name} className="inline-flex items-center gap-1.5">
                <span className={cn("size-[7px] rounded-full", m.color)} />
                {m.name}{" "}
                <b className="font-semibold text-foreground">{m.value}</b> /{" "}
                {m.goal} g
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-[46ch] text-base text-muted-foreground md:text-[19px]">
            The fridge, the grocery list, recipes and what you ate, in one app
            your household runs itself. Talk to it from any AI assistant.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-7 flex flex-col justify-center gap-2.5 md:flex-row">
            <a href="#self-host" className="block">
              <ShimmerButton
                tabIndex={-1}
                background="#28cf8b"
                shimmerColor="#ffffff"
                className="h-11 w-full px-[22px] text-[15px] font-semibold text-on-brand shadow-lg shadow-brand/30 md:w-auto"
              >
                Host it for free
                <ArrowRight className="ml-2 size-4" />
              </ShimmerButton>
            </a>
            <a
              href={REPO_URL}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-raised px-[22px] text-[15px] font-semibold text-foreground transition-colors hover:bg-track"
            >
              <GithubIcon className="size-4" />
              Browse the code
            </a>
          </div>
          <p className="mt-3.5 text-[13px] text-faint">
            No subscriptions · No ads · No tracking · Your data stays in your
            database
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div aria-hidden className="mt-[34px] flex justify-center gap-2 text-xs text-faint md:gap-[22px]">
            {WEEK.map((d) => (
              <span
                key={d.day}
                className="grid justify-items-center gap-1.5"
              >
                {d.letter}
                <i
                  className={cn(
                    "grid size-[30px] place-items-center rounded-full text-[13px] text-foreground not-italic",
                    d.today && "bg-foreground text-background",
                  )}
                >
                  {d.day}
                </i>
                <em
                  className={cn("size-1 rounded-full", d.dot)}
                  aria-hidden
                />
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.6} className="mt-10 md:mt-14">
        <AppDemo />
      </Reveal>
    </section>
  );
}
