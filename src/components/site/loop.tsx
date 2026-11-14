import { MagicCard } from "@/components/ui/magic-card";

import { Reveal } from "./reveal";

const STEPS = [
  {
    label: "01 · Groceries",
    dot: "bg-protein",
    title: "Buy it",
    body: "The list knows what’s already in the fridge, so “have 6 eggs, need 12” shows up before you double-buy.",
  },
  {
    label: "02 · Kitchen",
    dot: "bg-carbs",
    title: "Put it away",
    body: "Check items off and they land in the fridge or pantry, and the ones expiring soonest show first.",
  },
  {
    label: "03 · Recipes",
    dot: "bg-fat",
    title: "Cook it",
    body: "Cook a recipe and the ingredients come out of stock. Whatever you're short on goes on the list.",
  },
  {
    label: "04 · Today",
    dot: "bg-kcal",
    title: "Eat it",
    body: "Log what you ate and it counts toward your own goals. Everyone in the house has their own.",
  },
];

export function Loop() {
  return (
    <section id="how" className="relative py-16 md:py-24">
      {/* The beam is a CSS animation. Reduced motion hides it and leaves the
          track. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes fc-beam-slide{from{transform:translateX(-100%)}to{transform:translateX(340%)}}",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal inView>
          <span className="text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
            The loop
          </span>
          <h2 className="mt-3 max-w-[16ch] text-[34px] leading-[1.05] font-bold text-balance md:text-[52px]">
            Buy it, put it away, cook it, eat it.
          </h2>
        </Reveal>

        <div
          aria-hidden="true"
          className="relative mx-[12%] mt-[26px] hidden h-0.5 overflow-hidden rounded-sm bg-track md:block"
        >
          <i className="absolute inset-0 w-[30%] bg-[linear-gradient(90deg,transparent,#28cf8b,#b6f0d6,transparent)] motion-safe:animate-[fc-beam-slide_3s_linear_infinite] motion-reduce:hidden" />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} inView delay={i * 0.08}>
              <MagicCard
                className="h-full rounded-[20px] shadow-sm [&>div:first-child]:bg-panel"
                gradientSize={260}
                gradientFrom="#28cf8b"
                gradientTo="#b6f0d6"
                gradientColor="#28cf8b"
                gradientOpacity={0.1}
              >
                <div className="p-[22px]">
                  <span className="flex items-center gap-2 font-heading text-[13px] font-bold text-brand-text">
                    <span
                      className={`inline-block size-[7px] flex-none rounded-full ${s.dot}`}
                    />
                    {s.label}
                  </span>
                  <h3 className="mt-[30px] mb-2 text-[22px] font-bold">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </MagicCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
