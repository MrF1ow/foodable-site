import type { ReactNode } from "react";

import { SETUP_SKILL_URL } from "@/lib/site";

import { Reveal } from "./reveal";

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "Is it really free?",
    a: "Yes. Foodable is MIT-licensed open source. There’s no paid tier, no ads and no account with us. The only costs are whatever you pay to host it, which can be nothing if you run it at home.",
  },
  {
    q: "Do I need an AI assistant to use it?",
    a: "No. The web app covers the fridge, groceries, recipes, nutrition and settings on its own. Connecting an assistant just makes it faster: say what you want instead of tapping through it.",
  },
  {
    q: "Which assistants work with it?",
    a: "Any client that supports MCP over HTTP with OAuth. We use it with Claude and Grok. ChatGPT, VS Code and Goose also render Foodable’s in-chat cards.",
  },
  {
    q: "Where does my data live?",
    a: "In your own Postgres database, on a server you run. Nothing is sent to us. You can export everything as plain CSV files whenever you like.",
  },
  {
    q: "How technical do I need to be?",
    a: (
      <>
        Not very. Give it to your agent: point Claude Code, Codex or any agent
        that can run commands at the{" "}
        <a href={SETUP_SKILL_URL} className="text-brand-text hover:underline">
          setup skill
        </a>{" "}
        and it walks you through accounts, the database and going live, one
        step at a time. You click the buttons that need you. If you’d rather
        do it by hand, it’s a terminal, a few environment variables and a
        Postgres connection string.
      </>
    ),
  },
  {
    q: "Can more than one person use it?",
    a: "That’s the point. The owner adds household members, everyone signs in with their own username, and each person keeps their own goals and food log while sharing the kitchen.",
  },
  {
    q: "Is the nutrition info medical advice?",
    a: "No. Figures come from what you log and from Open Food Facts, and they’re estimates. Talk to a professional for anything medical.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[820px] px-4 sm:px-5 md:px-10">
        <Reveal inView>
          <h2 className="mb-7 text-[34px] leading-[1.05] font-bold md:text-[52px]">
            Questions
          </h2>
        </Reveal>
        <Reveal inView delay={0.08}>
          {FAQ.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group border-t border-line py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="text-xl leading-none text-faint group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden
                  className="hidden text-xl leading-none text-faint group-open:inline"
                >
                  –
                </span>
              </summary>
              <p className="mt-2.5 max-w-[62ch] leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
