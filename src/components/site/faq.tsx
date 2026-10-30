import { Plus } from "lucide-react";

import { Reveal } from "./reveal";

import { SectionHeading } from "./section-heading";

const FAQ = [
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
    a: "In your own Supabase project, on a server you run. Nothing is sent to us. You can export everything as plain CSV files whenever you like.",
  },
  {
    q: "How technical do I need to be?",
    a: "Comfortable with a terminal, environment variables and a database dashboard. If you’ve deployed a side project before, you’ll be fine. If not, it’s a fun first one.",
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
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12 space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} inView delay={0.05 * i}>
              <details className="group rounded-2xl border bg-card px-6 shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pb-5 leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
