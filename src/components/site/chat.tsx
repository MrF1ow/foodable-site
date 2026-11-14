"use client";

import { ArrowUp, Check } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
import { shot, Themed } from "./themed-shot";

// Tool names are real tools in MrF1ow/foodable (src/mcp/tools-list.snapshot.json)
// and `card` is a file in public/shots/chat/.
const SCENES = [
  {
    prompt: "We're out of milk, add it to the Costco list.",
    tool: "add_grocery_line",
    card: "grocery",
    label: "Add milk to Costco",
    alt: "A Foodable grocery card showing milk added to the Costco list",
  },
  {
    prompt: "What's in the fridge that I should use?",
    tool: "get_fridge",
    card: "fridge",
    label: "What should I use?",
    alt: "A Foodable fridge card listing what to use first",
  },
  {
    prompt: "I had the chicken rice bowl for lunch.",
    tool: "log_meal",
    card: "logmeal",
    label: "Log my lunch",
    alt: "A Foodable card confirming the chicken rice bowl was logged",
  },
  {
    prompt: "How am I doing today?",
    tool: "get_nutrition_summary",
    card: "summary",
    label: "How am I doing?",
    alt: "A Foodable card summarising today's nutrition",
  },
] as const;

const CYCLE_MS = 6500;
const REDUCED = "(prefers-reduced-motion: reduce)";

const KEYFRAMES = [
  "@keyframes fc-pop{from{opacity:0;transform:translateY(8px) scale(.97)}}",
  "@keyframes fc-rise{from{opacity:.0001;transform:translateY(10px)}}",
  "@keyframes fc-think{0%{opacity:0}15%,85%{opacity:1}100%{opacity:0}}",
  "@keyframes fc-blink{to{opacity:.25}}",
  "@keyframes fc-prog{from{transform:scaleX(0)}}",
].join("");

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

const noop = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

function Fact({
  value,
  label,
  count,
}: {
  value: number;
  label: string;
  count: boolean;
}) {
  return (
    <div>
      <b className="block font-heading text-[44px] leading-[1.15] font-bold tracking-[-0.02em]">
        {count ? (
          <NumberTicker
            value={value}
            className="tracking-[-0.02em] text-foreground [font-variant-numeric:normal]"
          />
        ) : (
          value
        )}
      </b>
      <span className="text-[13px] text-faint">{label}</span>
    </div>
  );
}

export function Chat() {
  const [index, setIndex] = useState(0);
  // Bumped on every jump so the active scene and its progress bar replay.
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hydrated = useHydrated();

  // Start the cycle the first time the window is mostly in view.
  useEffect(() => {
    const el = windowRef.current;
    if (started || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // One timer for the active scene. Any jump changes `index` or `run`, which
  // restarts it.
  useEffect(() => {
    if (!started || reduced) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % SCENES.length);
      setRun((r) => r + 1);
    }, CYCLE_MS);
    return () => clearTimeout(t);
  }, [started, reduced, index, run]);

  function jump(to: number) {
    setIndex(to);
    setRun((r) => r + 1);
    setStarted(true);
  }

  return (
    <section
      id="chat"
      className="relative border-t border-line py-16 md:py-24"
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 sm:px-5 lg:grid-cols-[1fr_470px] lg:gap-[72px] [&>*]:min-w-0">
        <Reveal inView>
          <span className="text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
            In your assistant
          </span>
          <h2 className="mt-3 max-w-[16ch] text-[34px] leading-[1.05] font-bold text-balance md:text-[52px]">
            Say it. It&apos;s done.
          </h2>
          <p className="mt-4 max-w-[36ch] text-lg text-muted-foreground">
            Connect Claude, Grok or any MCP client. It reads the fridge, fills
            the list and logs dinner, and answers with Foodable&apos;s own
            cards, in light or dark to match your chat.
          </p>
          <div className="mt-7 flex gap-7">
            <Fact value={73} label="tools" count={hydrated && !reduced} />
            <Fact value={8} label="in-chat cards" count={hydrated && !reduced} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Claude", "Grok", "Any MCP client"].map((c) => (
              <span
                key={c}
                className="inline-flex h-7 items-center rounded-full bg-raised px-3 text-[13px] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <div
          ref={windowRef}
          className="overflow-hidden rounded-[28px] border border-line bg-panel shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]"
        >
          <div className="flex h-12 items-center gap-2 border-b border-line px-[18px] text-[13px] font-medium">
            <span className="size-[7px] flex-none rounded-full bg-brand" />
            Your assistant
            <span className="font-normal text-faint">· Foodable connected</span>
            <span className="flex-1" />
            <span className="font-mono text-[11px] font-normal text-faint">
              MCP
            </span>
          </div>

          <div className="relative h-[440px] md:h-[452px]">
            {SCENES.map((s, k) => {
              const on = k === index;
              return (
                <div
                  key={s.card}
                  data-on={on}
                  data-play={on && started}
                  aria-hidden={!on}
                  className="group/sc invisible absolute inset-0 opacity-0 [transition:opacity_0.3s,visibility_0s_0.3s] data-[on=true]:visible data-[on=true]:opacity-100 data-[on=true]:[transition:opacity_0.3s]"
                >
                  {/* Re-keyed on each jump so the staged entrance replays. */}
                  <div
                    key={on ? run : "idle"}
                    className="flex h-full flex-col gap-3 px-5 py-[18px]"
                  >
                    <div
                      className={cn(
                        "max-w-[85%] self-end rounded-[18px_18px_6px_18px] bg-raised px-[15px] py-[9px] text-sm",
                        "motion-safe:group-data-[play=true]/sc:[animation:fc-pop_0.4s_cubic-bezier(0.3,0.7,0.2,1.2)_both]",
                      )}
                    >
                      {s.prompt}
                    </div>
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute top-[70px] left-5 flex h-3 items-center gap-1 opacity-0",
                        "motion-safe:group-data-[play=true]/sc:[animation:fc-think_1.1s_ease_0.35s_both]",
                      )}
                    >
                      {[0, 0.15, 0.3].map((d) => (
                        <i
                          key={d}
                          className={cn(
                            "size-1.5 rounded-full bg-faint",
                            "motion-safe:group-data-[play=true]/sc:[animation:fc-blink_0.6s_ease-in-out_infinite_alternate]",
                          )}
                          style={{ animationDelay: `${d}s` }}
                        />
                      ))}
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1.5 font-mono text-xs text-faint",
                        "motion-safe:group-data-[play=true]/sc:[animation:fc-pop_0.35s_ease_1.2s_both]",
                      )}
                    >
                      <Check className="size-3.5 text-brand-text" aria-hidden="true" />
                      <span className="text-brand-text">{s.tool}</span>
                    </div>
                    <div
                      className={cn(
                        "mt-0.5 w-full max-w-[320px] md:w-[340px] md:max-w-none",
                        "motion-safe:group-data-[play=true]/sc:[animation:fc-rise_0.5s_cubic-bezier(0.3,0.7,0.2,1)_1.4s_both]",
                      )}
                    >
                      <Themed
                        light={<Card name={s.card} theme="light" alt={s.alt} />}
                        dark={<Card name={s.card} theme="dark" alt={s.alt} />}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-2.5 border-t border-line px-3.5 pt-3 pb-3.5">
            <div className="flex flex-wrap gap-1.5">
              {SCENES.map((s, k) => {
                const on = k === index;
                return (
                  <button
                    key={s.card}
                    type="button"
                    aria-pressed={on}
                    onClick={() => jump(k)}
                    className={cn(
                      "relative h-[30px] flex-none cursor-pointer overflow-hidden rounded-full border border-line px-3 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      on && "border-brand/55 text-foreground",
                    )}
                  >
                    {s.label}
                    {on ? (
                      <span
                        key={run}
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand",
                          "motion-safe:[animation:fc-prog_6.5s_linear_both]",
                          !started && "[animation-play-state:paused]",
                        )}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="flex items-center gap-2.5 rounded-full bg-raised py-[5px] pr-[5px] pl-4 text-sm text-faint"
            >
              <span className="flex-1">Ask Foodable anything…</span>
              <i className="grid size-[30px] place-items-center rounded-full bg-brand text-on-brand">
                <ArrowUp className="size-4" />
              </i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  name,
  theme,
  alt,
}: {
  name: string;
  theme: "light" | "dark";
  alt: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={shot("chat", name, theme)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-auto w-full rounded-[18px] border border-line"
    />
  );
}
