import { ArrowRight } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DOCS_URL, REPO_URL, UPSTREAM_URL } from "@/lib/site";

import { GithubIcon } from "./github-icon";
import { Logo, LogoMark } from "./logo";

const FOODS = ["🥚", "🥬", "🍅", "🥑", "🧀", "🍌", "🥕", "🍋"];

export function FinalCta() {
  return (
    <section className="px-5 py-16">
      <BlurFade inView>
        <div className="relative mx-auto grid max-w-6xl items-center overflow-hidden rounded-[2rem] border bg-brand-soft px-8 py-16 sm:px-14 lg:grid-cols-2">
          <DotPattern className="text-brand/20 [mask-image:radial-gradient(500px_circle_at_80%_50%,white,transparent)]" />
          <div className="relative">
            <h2 className="text-4xl font-bold text-balance sm:text-5xl">
              Make dinner the easy part again.
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Grab the code, spin it up, and give your household one place for
              food. We’d love to hear how it goes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={DOCS_URL}>
                <ShimmerButton
                  background="#28cf8b"
                  shimmerColor="#ffffff"
                  className="h-12 px-7 text-base font-semibold text-[#062c1c]"
                >
                  Start self-hosting
                  <ArrowRight className="ml-2 size-4" />
                </ShimmerButton>
              </a>
              <a
                href={REPO_URL}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border bg-card px-6 font-medium shadow-sm transition-colors hover:bg-muted"
              >
                <GithubIcon className="size-4" />
                Star on GitHub
              </a>
            </div>
          </div>
          <div className="relative mt-12 hidden h-[320px] items-center justify-center lg:mt-0 lg:flex">
            <span className="z-10 flex size-24 items-center justify-center rounded-full border border-brand/30 bg-card shadow-xl">
              <LogoMark className="size-11" />
            </span>
            <OrbitingCircles iconSize={44} radius={140} duration={30}>
              {FOODS.slice(0, 5).map((f) => (
                <span key={f} className="text-3xl">
                  {f}
                </span>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={32} radius={80} reverse duration={22}>
              {FOODS.slice(5).map((f) => (
                <span key={f} className="text-2xl">
                  {f}
                </span>
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 font-heading font-semibold">
            Making food more doable.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Built at a kitchen table by a household that got tired of juggling
            apps. Free and open source under the MIT license.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <a className="text-muted-foreground hover:text-foreground" href={REPO_URL}>
            GitHub
          </a>
          <a className="text-muted-foreground hover:text-foreground" href={DOCS_URL}>
            Self-hosting guide
          </a>
          <a className="text-muted-foreground hover:text-foreground" href="#how">
            How it works
          </a>
          <a className="text-muted-foreground hover:text-foreground" href="#faq">
            FAQ
          </a>
          <a
            className="text-muted-foreground hover:text-foreground"
            href={UPSTREAM_URL}
          >
            Forked from nutrition-mcp
          </a>
          <a
            className="text-muted-foreground hover:text-foreground"
            href={`${REPO_URL}/blob/main/LICENSE`}
          >
            MIT License
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-muted-foreground">
        Nutrition figures are estimates, not medical advice.
      </p>
    </footer>
  );
}
