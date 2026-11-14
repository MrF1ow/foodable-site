import { BookOpen } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { DOCS_URL } from "@/lib/site";

import { AgentPrompt } from "./agent-prompt";
import { Reveal } from "./reveal";

const NEEDS = [
  {
    title: "Bun",
    body: "The runtime. One install command and you’re set.",
  },
  {
    title: "A Postgres database",
    body: "Any Postgres works. It holds your data and your logins, so there’s no separate auth service to run.",
  },
  {
    title: "Somewhere to run it",
    body: "A box at home, Docker, or a small cloud host like Railway (about $5 a month).",
  },
];

export function SelfHost() {
  return (
    <section
      id="self-host"
      className="relative border-y border-line bg-panel py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-7 px-4 sm:px-5 md:gap-12 lg:grid-cols-2 [&>*]:min-w-0">
        <Reveal inView>
          <span className="text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
            Self-host
          </span>
          <h2 className="mt-3 text-[34px] leading-[1.05] font-bold text-balance md:text-[52px]">
            It&apos;s free. Setup takes an evening.
          </h2>
          <p className="mt-5 max-w-[52ch] text-base text-muted-foreground">
            Foodable isn’t a service you sign up for. It’s software you run for
            your own household, so there’s nobody in the middle and nothing to
            pay us.
          </p>
          <ol className="mt-7">
            {NEEDS.map((n, i) => (
              <li
                key={n.title}
                className="flex items-start gap-2.5 border-t border-line py-4 first:border-t-0"
              >
                <span className="w-7 flex-none font-heading text-[15px] font-bold text-brand-text">
                  {i + 1}
                </span>
                <div>
                  <b className="font-semibold">{n.title}</b>
                  <p className="mt-0.5 text-muted-foreground">{n.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={DOCS_URL}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-text hover:underline"
          >
            <BookOpen className="size-4" />
            Read the full self-hosting guide
          </a>
        </Reveal>

        <Reveal inView delay={0.1}>
          <div className="relative mb-3 overflow-hidden rounded-[20px] border border-line bg-background p-5">
            <h3 className="font-sans text-base font-semibold">
              Give it to your agent
            </h3>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">
              Foodable comes with a setup skill. Paste this into Claude Code, Codex
              or any agent that can run commands. It asks what accounts you
              have, runs the commands it can, and tells you what to click for
              the rest.
            </p>
            <AgentPrompt />
            <BorderBeam
              size={140}
              duration={9}
              colorFrom="#28cf8b"
              colorTo="#b6f0d6"
              className="motion-reduce:hidden"
            />
          </div>
          <p className="mb-3 px-1 text-sm font-medium text-muted-foreground">
            Doing it by hand is just a handful of commands.
          </p>
          <Terminal
            className="h-auto max-h-none w-full max-w-none overflow-x-auto rounded-[20px] border-line bg-raised text-muted-foreground [&_.rounded-full]:bg-track [&_pre]:min-h-[268px] [&_pre]:px-5 [&_pre]:py-4"
            sequence
            startOnView
          >
            <TypingAnimation>$ git clone https://github.com/MrF1ow/foodable</TypingAnimation>
            <TypingAnimation>$ cd foodable &amp;&amp; bun install</TypingAnimation>
            <AnimatedSpan className="text-muted-foreground">
              ✔ Dependencies installed
            </AnimatedSpan>
            <TypingAnimation>$ cp .env.example .env</TypingAnimation>
            <TypingAnimation>$ bun run generate-oauth-creds</TypingAnimation>
            <AnimatedSpan className="text-muted-foreground">
              ✔ OAuth client and session secret ready, paste into .env
            </AnimatedSpan>
            <TypingAnimation>$ bun run db:migrate</TypingAnimation>
            <AnimatedSpan className="text-muted-foreground">
              ✔ Migrations applied
            </AnimatedSpan>
            <TypingAnimation>$ bun src/index.ts</TypingAnimation>
            <AnimatedSpan className="text-brand-text">
              🥗 Foodable is cooking on http://localhost:8080
            </AnimatedSpan>
          </Terminal>
        </Reveal>
      </div>
    </section>
  );
}
