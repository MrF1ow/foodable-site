"use client";

import {
  CookingPot,
  MessageCircle,
  Refrigerator,
  Salad,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { forwardRef, useRef, type ReactNode } from "react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

import { LogoMark } from "./logo";
import { SectionHeading } from "./section-heading";

const Node = forwardRef<
  HTMLDivElement,
  { className?: string; children: ReactNode; label: string }
>(({ className, children, label }, ref) => (
  <div className="flex flex-col items-center gap-2">
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border bg-card shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] sm:size-16",
        className,
      )}
    >
      {children}
    </div>
    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
      {label}
    </span>
  </div>
));
Node.displayName = "Node";

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShoppingCart,
    title: "Buy it",
    body: "The list knows what’s already in the fridge, so “have 6 eggs, need 12” shows up before you double-buy.",
  },
  {
    icon: Refrigerator,
    title: "Put it away",
    body: "Check items off and they land in the fridge or pantry, with an eye on what expires first.",
  },
  {
    icon: CookingPot,
    title: "Cook it",
    body: "Cook a recipe and the ingredients come out of stock. Short on something? It goes on the list.",
  },
  {
    icon: Salad,
    title: "Eat it",
    body: "Log your portion and the real nutrition follows, per person, against each of your goals.",
  },
];

export function Loop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const groceryRef = useRef<HTMLDivElement>(null);
  const fridgeRef = useRef<HTMLDivElement>(null);
  const recipeRef = useRef<HTMLDivElement>(null);
  const mealRef = useRef<HTMLDivElement>(null);

  const beam = {
    containerRef,
    gradientStartColor: "#28cf8b",
    gradientStopColor: "#b6f0d6",
    duration: 4,
  };

  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Buy it. Store it. Cook it. Eat it.
              <br className="hidden sm:block" />{" "}
              <span className="text-brand">One loop.</span>
            </>
          }
        >
          Most apps track one of those steps. Foodable tracks the whole loop,
          and every step points at the same foods. The eggs on your list are
          the eggs in your fridge are the eggs in tonight’s shakshuka.
        </SectionHeading>

        <BlurFade inView delay={0.1}>
          <div
            ref={containerRef}
            className="relative mx-auto mt-16 flex h-[440px] w-full max-w-3xl items-center justify-between rounded-3xl border bg-card/60 px-6 py-8 shadow-sm sm:h-[460px] sm:px-14"
          >
            <div className="flex flex-col gap-14">
              <Node ref={chatRef} label="Your AI">
                <MessageCircle className="size-6" />
              </Node>
              <Node ref={webRef} label="Web app">
                <Smartphone className="size-6" />
              </Node>
            </div>

            <Node
              ref={hubRef}
              label="Foodable"
              className="size-20 border-brand/40 bg-brand-soft sm:size-24"
            >
              <LogoMark className="size-9 sm:size-11" />
            </Node>

            <div className="flex flex-col gap-4 sm:gap-5">
              <Node ref={groceryRef} label="Groceries" className="size-12 sm:size-14">
                <ShoppingCart className="size-5" />
              </Node>
              <Node ref={fridgeRef} label="Fridge" className="size-12 sm:size-14">
                <Refrigerator className="size-5" />
              </Node>
              <Node ref={recipeRef} label="Recipes" className="size-12 sm:size-14">
                <CookingPot className="size-5" />
              </Node>
              <Node ref={mealRef} label="Meals" className="size-12 sm:size-14">
                <Salad className="size-5" />
              </Node>
            </div>

            <AnimatedBeam {...beam} fromRef={chatRef} toRef={hubRef} curvature={-40} />
            <AnimatedBeam {...beam} fromRef={webRef} toRef={hubRef} curvature={40} delay={0.5} />
            <AnimatedBeam {...beam} fromRef={hubRef} toRef={groceryRef} curvature={-50} delay={0.2} />
            <AnimatedBeam {...beam} fromRef={hubRef} toRef={fridgeRef} curvature={-15} delay={0.7} />
            <AnimatedBeam {...beam} fromRef={hubRef} toRef={recipeRef} curvature={15} delay={1.2} />
            <AnimatedBeam {...beam} fromRef={hubRef} toRef={mealRef} curvature={50} delay={1.7} />
          </div>
        </BlurFade>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <BlurFade key={s.title} inView delay={0.1 + i * 0.08}>
              <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <s.icon className="size-4.5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
