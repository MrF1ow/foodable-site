import { BlurFade } from "@/components/ui/blur-fade";
import { Iphone } from "@/components/ui/iphone";

import { SectionHeading } from "./section-heading";
import { shot, Themed } from "./themed-shot";

const PHONES = [
  { name: "fridge", label: "What’s in the house" },
  { name: "grocery", label: "What to pick up" },
  { name: "recipe", label: "What’s for dinner" },
];

export function Screens() {
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Rather tap than talk?"
          title="A real app on your phone, too."
        >
          Every pillar has a clean, fast web app that works on any phone or
          laptop, in light or dark. Add it to your home screen and it feels
          right at home.
        </SectionHeading>
        <div className="mt-16 flex items-end justify-center gap-4 sm:gap-8">
          {PHONES.map((p, i) => (
            <BlurFade
              key={p.name}
              inView
              delay={0.1 + i * 0.12}
              className={
                i === 1
                  ? "w-[38%] max-w-[300px] -translate-y-6"
                  : "w-[31%] max-w-[260px]"
              }
            >
              <div className="drop-shadow-2xl">
                <Themed
                  light={<Iphone src={shot(p.name, "light", true)} />}
                  dark={<Iphone src={shot(p.name, "dark", true)} />}
                />
              </div>
              <p className="mt-5 text-center text-sm font-medium text-muted-foreground">
                {p.label}
              </p>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
