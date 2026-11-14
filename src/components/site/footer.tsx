import { ArrowRight } from "lucide-react";

import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DOCS_URL, REPO_URL, UPSTREAM_URL } from "@/lib/site";

import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";
import { Reveal } from "./reveal";

const GREENS = ["#28cf8b", "#7ee2b8", "#14a86c", "#b6f0d6"];

const LINKS = [
  { href: REPO_URL, label: "GitHub" },
  { href: DOCS_URL, label: "Self-hosting guide" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: UPSTREAM_URL, label: "Forked from nutrition-mcp" },
  { href: `${REPO_URL}/blob/main/LICENSE`, label: "MIT License" },
];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line py-20 text-center md:py-[120px]">
      <DotPattern
        aria-hidden
        className="text-brand/25 [mask-image:radial-gradient(520px_circle_at_50%_50%,white,transparent)]"
      />
      <Reveal
        inView
        className="relative mx-auto max-w-6xl px-4 sm:px-5 md:px-10"
      >
        <h2 className="mx-auto text-[40px] leading-[1.05] font-bold text-balance md:text-[64px]">
          Making food more <AuroraText colors={GREENS}>doable.</AuroraText>
        </h2>
        <p className="mt-3.5 text-muted-foreground">
          Free, open source and yours to host. This is version one, and
          there&apos;s a lot more on the way.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <a href="#self-host" className="rounded-full">
            <ShimmerButton
              type="button"
              tabIndex={-1}
              background="#28cf8b"
              shimmerColor="#ffffff"
              className="h-11 px-[22px] text-[15px] font-semibold text-on-brand shadow-lg shadow-brand/30"
            >
              Host it for free
              <ArrowRight className="ml-2 size-4" />
            </ShimmerButton>
          </a>
          <a
            href={REPO_URL}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-raised px-[22px] text-[15px] font-semibold text-foreground transition-colors hover:bg-track"
          >
            <GithubIcon className="size-4" />
            Browse the code
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-[13px] text-faint">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 sm:px-5">
        <Logo className="text-faint [&_span]:text-[15px] [&_svg]:size-6" />
        <span>Foodable, Making Food More Doable · MIT</span>
      </div>
      <div className="mx-auto mt-5 flex max-w-6xl flex-col gap-3 px-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs">Nutrition figures are estimates, not medical advice.</p>
      </div>
    </footer>
  );
}
