"use client";

import { Check, Wrench } from "lucide-react";
import { motion } from "motion/react";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { WordRotate } from "@/components/ui/word-rotate";

import { LogoMark } from "./logo";

type Msg =
  | { from: "you"; text: string }
  | { from: "ai"; text: string; tools: string[] };

const CONVO: Msg[] = [
  {
    from: "you",
    text: "We’re out of milk. Also, what can I make tonight with what’s in the fridge?",
  },
  {
    from: "ai",
    tools: ["add_grocery_line", "list_expiring", "list_recipes"],
    text: "Milk is on the Safeway list. Your eggs and spinach expire this week, so shakshuka is a good fit. It serves 4. Want me to cook it?",
  },
  { from: "you", text: "Yes! I’ll have one and a half portions." },
  {
    from: "ai",
    tools: ["cook_recipe", "get_goal_progress"],
    text: "Done. 6 eggs came out of the fridge and 480 kcal is logged for you. You’re 165 kcal under today’s goal. 🎉",
  },
];

const CLIENTS = ["Claude", "ChatGPT", "VS Code", "Goose", "Grok", "any MCP client"];

export function Chat() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* A gradient rather than a blurred blob: it fades out inside the
          section, so overflow-hidden never cuts it off flat. */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[1100px] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_13%,transparent),color-mix(in_oklab,var(--brand)_7%,transparent)_35%,color-mix(in_oklab,var(--brand)_2.5%,transparent)_65%,transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.1fr] [&>*]:min-w-0">
        <BlurFade inView>
          <p className="text-sm font-semibold tracking-wider text-brand uppercase">
            Just ask
          </p>
          <h2 className="mt-3 text-4xl font-bold text-balance sm:text-5xl">
            Your kitchen, one sentence away.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Foodable speaks MCP, the open standard AI assistants use to work
            with real tools. Connect it once and just talk: add to the list,
            check the fridge, cook dinner, log lunch. No forms, no tapping
            through menus.
          </p>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-2 text-lg">
            <span className="text-muted-foreground">Works with</span>
            <WordRotate
              words={CLIENTS}
              duration={2200}
              className="font-heading text-2xl font-bold text-brand"
            />
          </div>
          <div className="mt-8 grid max-w-sm grid-cols-2 gap-4">
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="font-heading text-4xl font-bold">
                <NumberTicker value={67} className="text-foreground" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                tools your assistant can use
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="font-heading text-4xl font-bold">
                <NumberTicker value={8} className="text-foreground" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                live cards that render right in the chat
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="rounded-3xl border bg-card/80 p-4 shadow-2xl shadow-black/5 backdrop-blur sm:p-6">
            <div className="mb-4 flex items-center gap-2 border-b pb-4">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-sm text-muted-foreground">
                Your assistant · Foodable connected
              </span>
            </div>
            <motion.ul
              className="flex flex-col gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{ show: { transition: { staggerChildren: 0.9 } } }}
            >
              {CONVO.map((m, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.97 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className={m.from === "you" ? "flex justify-end" : "flex gap-3"}
                >
                  {m.from === "you" ? (
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-[15px] text-on-brand">
                      {m.text}
                    </p>
                  ) : (
                    <>
                      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                        <LogoMark className="size-4" />
                      </span>
                      <div className="max-w-[85%]">
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {m.tools.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 rounded-md border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                            >
                              <Wrench className="size-3" />
                              {t}
                              <Check className="size-3 text-brand" />
                            </span>
                          ))}
                        </div>
                        <p className="rounded-2xl rounded-tl-md bg-muted px-4 py-2.5 text-[15px]">
                          {m.text}
                        </p>
                      </div>
                    </>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
