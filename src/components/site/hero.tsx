import { ArrowRight, Heart } from "lucide-react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Iphone } from "@/components/ui/iphone";
import { Safari } from "@/components/ui/safari";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { REPO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { GithubIcon } from "./github-icon";
import { shot, Themed } from "./themed-shot";

const GREENS = ["#28cf8b", "#7ee2b8", "#14a86c", "#b6f0d6"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <DotPattern
        className={cn(
          "text-brand/25 [mask-image:radial-gradient(700px_circle_at_50%_0%,white,transparent)]",
        )}
      />
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[480px] max-w-3xl rounded-full bg-brand/20 blur-[120px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 text-center">
        <BlurFade delay={0.05} inView>
          <a
            href={REPO_URL}
            className="group inline-flex items-center rounded-full border bg-card/70 text-sm shadow-sm backdrop-blur transition-colors hover:bg-card"
          >
            <AnimatedShinyText className="inline-flex items-center gap-1.5 px-4 py-1.5">
              <Heart className="size-3.5 fill-brand text-brand" />
              Free, open source &amp; yours to host
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </a>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
            Making food more <AuroraText colors={GREENS}>doable.</AuroraText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <p className="mt-6 max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
            One kitchen, one app. Foodable keeps your fridge, grocery list,
            recipes and nutrition together, and lets you run it all by just
            talking to your AI assistant. Built for your household, hosted by
            you.
          </p>
        </BlurFade>

        <BlurFade delay={0.35} inView>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#self-host">
              <ShimmerButton
                background="#28cf8b"
                shimmerColor="#ffffff"
                className="h-12 px-7 text-base font-semibold text-[#062c1c] shadow-lg shadow-brand/30"
              >
                Host it for free
                <ArrowRight className="ml-2 size-4" />
              </ShimmerButton>
            </a>
            <a
              href={REPO_URL}
              className="inline-flex h-12 items-center gap-2 rounded-full border bg-card px-6 text-base font-medium shadow-sm transition-colors hover:bg-muted"
            >
              <GithubIcon className="size-4" />
              Browse the code
            </a>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            No subscriptions · No ads · No tracking · Your data stays in your
            database
          </p>
        </BlurFade>

        <BlurFade delay={0.5} inView className="relative mt-16 w-full max-w-5xl">
          <div className="relative rounded-2xl">
            <Themed
              light={
                <Safari
                  url="foodable.your-home.net"
                  imageSrc={shot("nutrition", "light")}
                  className="w-full drop-shadow-2xl"
                />
              }
              dark={
                <Safari
                  url="foodable.your-home.net"
                  imageSrc={shot("nutrition", "dark")}
                  className="w-full drop-shadow-2xl"
                />
              }
            />
            <BorderBeam
              size={220}
              duration={9}
              colorFrom="#28cf8b"
              colorTo="#b6f0d6"
              className="rounded-[12px]"
            />
          </div>
          <div className="absolute -right-4 -bottom-10 hidden w-[200px] rotate-3 drop-shadow-2xl md:block lg:-right-12 lg:w-[230px]">
            <Themed
              light={<Iphone src={shot("grocery", "light", true)} />}
              dark={<Iphone src={shot("grocery", "dark", true)} />}
            />
          </div>
          <div className="absolute -bottom-8 -left-4 hidden w-[180px] -rotate-3 drop-shadow-2xl md:block lg:-left-12 lg:w-[210px]">
            <Themed
              light={<Iphone src={shot("fridge", "light", true)} />}
              dark={<Iphone src={shot("fridge", "dark", true)} />}
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
