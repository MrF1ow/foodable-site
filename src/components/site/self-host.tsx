import { BookOpen, Database, Server, Zap } from "lucide-react";

import { Reveal } from "./reveal";
import { MagicCard } from "@/components/ui/magic-card";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { DOCS_URL } from "@/lib/site";

import { SectionHeading } from "./section-heading";

const NEEDS = [
  {
    icon: Zap,
    title: "Bun",
    body: "The runtime. One install command and you’re set.",
  },
  {
    icon: Database,
    title: "A Supabase project",
    body: "The free tier is plenty for a household. It holds your data and your logins.",
  },
  {
    icon: Server,
    title: "Somewhere to run it",
    body: "A box at home, Docker, or a small cloud host like Railway (about $5 a month).",
  },
];

export function SelfHost() {
  return (
    <section id="self-host" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Self-host"
          title="Free forever. Running in an evening."
        >
          Foodable isn’t a service you sign up for. It’s software you run for
          your own household, so there’s nobody in the middle and nothing to
          pay us. If you’re comfortable in a terminal, you’ve got this.
        </SectionHeading>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
          <Reveal inView delay={0.1}>
            <Terminal className="max-h-none overflow-x-auto w-full max-w-none bg-card shadow-xl" sequence startOnView>
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
              <TypingAnimation>$ supabase db push</TypingAnimation>
              <AnimatedSpan className="text-muted-foreground">
                ✔ Migrations applied
              </AnimatedSpan>
              <TypingAnimation>$ bun src/index.ts</TypingAnimation>
              <AnimatedSpan className="text-brand">
                🥗 Foodable is cooking on http://localhost:8080
              </AnimatedSpan>
            </Terminal>
          </Reveal>

          <div className="flex flex-col gap-4">
            {NEEDS.map((n, i) => (
              <Reveal key={n.title} inView delay={0.15 + i * 0.08}>
                <MagicCard
                  className="rounded-2xl"
                  gradientColor="rgba(40,207,139,0.12)"
                  gradientFrom="#28cf8b"
                  gradientTo="#b6f0d6"
                >
                  <div className="flex gap-4 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <n.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{n.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {n.body}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </Reveal>
            ))}
            <Reveal inView delay={0.4}>
              <a
                href={DOCS_URL}
                className="inline-flex items-center gap-2 px-1 text-sm font-medium text-brand hover:underline"
              >
                <BookOpen className="size-4" />
                Read the full self-hosting guide
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
