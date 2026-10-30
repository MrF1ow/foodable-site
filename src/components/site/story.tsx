import { Reveal } from "./reveal";
import { Marquee } from "@/components/ui/marquee";

import { LogoMark } from "./logo";

const ROW_ONE = [
  "Calorie counter",
  "Grocery list app",
  "Recipe bookmarks",
  "Pantry spreadsheet",
  "Meal planner subscription",
  "Water reminder app",
];
const ROW_TWO = [
  "Sticky note on the fridge",
  "“Do we have eggs?” texts",
  "Screenshot of a recipe",
  "Weight tracker",
  "Shared notes doc",
  "The forgotten spinach",
];

function Chip({ label }: { label: string }) {
  return (
    <span className="relative inline-flex items-center rounded-full border bg-card px-4 py-2 text-sm whitespace-nowrap text-muted-foreground shadow-sm">
      <span className="line-through decoration-brand decoration-2">{label}</span>
    </span>
  );
}

export function Story() {
  return (
    <section id="story" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2 [&>*]:min-w-0">
        <Reveal inView>
          <p className="text-sm font-semibold tracking-wider text-brand uppercase">
            Why it exists
          </p>
          <h2 className="mt-3 text-4xl font-bold text-balance sm:text-5xl">
            We got sick of all the apps.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              My wife and I had an app for counting calories, another for the
              grocery list, a folder of recipe screenshots, and a fridge full of
              things we forgot we bought. None of them talked to each other.
              Half of them wanted a subscription.
            </p>
            <p>
              I’m a software engineer, so one night the question became
              pretty simple: <em className="text-foreground">why not?</em> Why not
              build the one app we actually wanted, the one where buying,
              storing, cooking and eating are all the same story?
            </p>
            <p>
              That’s Foodable. We use it every day. It’s free, and it’s yours
              to run too.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft">
              <LogoMark className="size-5" />
            </span>
            <div>
              <p className="font-heading font-semibold">Ethan &amp; family</p>
              <p className="text-sm text-muted-foreground">
                The household behind Foodable
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal inView delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl border bg-muted/40 py-10">
            <p className="px-8 text-center text-sm font-medium text-muted-foreground">
              What Foodable replaced in our house
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Marquee pauseOnHover className="[--duration:32s] [--gap:0.75rem]">
                {ROW_ONE.map((l) => (
                  <Chip key={l} label={l} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:36s] [--gap:0.75rem]"
              >
                {ROW_TWO.map((l) => (
                  <Chip key={l} label={l} />
                ))}
              </Marquee>
            </div>
            <div className="mt-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-heading font-semibold text-on-brand shadow-lg shadow-brand/25">
                <LogoMark className="size-4 text-on-brand" />
                Just Foodable
              </span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
