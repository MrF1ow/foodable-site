"use client";

import { useEffect, useRef, useState } from "react";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { REPO_URL } from "@/lib/site";

import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "#tour", label: "Tour" },
  { href: "#chat", label: "Ask it" },
  { href: "#features", label: "Features" },
  { href: "#self-host", label: "Self-host" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Floating glass pill. The server HTML has every link and button. Effects add
 * the hover indicator and the tighter scrolled state.
 */
export function Nav() {
  const [small, setSmall] = useState(false);
  const indRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setSmall(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function showIndicator(a: HTMLAnchorElement) {
    const ind = indRef.current;
    if (!ind) return;
    // First show: jump to the link instead of sliding in from the left edge.
    const hidden = ind.style.opacity !== "1";
    if (hidden) ind.style.transition = "none";
    ind.style.width = `${a.offsetWidth}px`;
    ind.style.transform = `translateX(${a.offsetLeft}px)`;
    if (hidden) {
      void ind.offsetWidth;
      ind.style.transition = "";
    }
    ind.style.opacity = "1";
  }

  function hideIndicator() {
    if (indRef.current) indRef.current.style.opacity = "0";
  }

  return (
    <header className="pointer-events-none sticky top-[10px] z-50 -mb-[62px] flex h-[62px] justify-center px-3 pt-[10px] md:top-[14px] md:-mb-[72px] md:h-[72px] md:px-6 md:pt-[14px]">
      <div
        data-small={small}
        className="group/pill pointer-events-auto grid h-[52px] w-full max-w-[920px] grid-cols-[1fr_auto] items-center rounded-full border border-line bg-glass pr-1.5 pl-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_18px_40px_-22px_rgba(0,0,0,.55)] backdrop-blur-[20px] backdrop-saturate-150 transition-[max-width,height] motion-reduce:transition-none duration-[400ms] ease-[cubic-bezier(.3,.7,.2,1)] md:h-[58px] md:grid-cols-[1fr_auto_1fr] md:pr-[9px] md:pl-5 md:data-[small=true]:h-[50px] md:data-[small=true]:max-w-[780px]"
      >
        <a
          href="#top"
          aria-label="Foodable home"
          className="justify-self-start [&_span]:text-[17px] [&_svg]:size-[21px]"
        >
          <Logo />
        </a>
        <nav
          aria-label="Sections"
          onMouseLeave={hideIndicator}
          onBlur={hideIndicator}
          className="relative hidden md:flex"
        >
          <span
            ref={indRef}
            aria-hidden
            style={{ opacity: 0 }}
            className="pointer-events-none absolute top-0 left-0 h-[34px] w-0 rounded-full bg-raised motion-reduce:[transition:opacity_.2s] [transition:transform_.35s_cubic-bezier(.3,.7,.2,1),width_.35s_cubic-bezier(.3,.7,.2,1),opacity_.2s]"
          />
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={(e) => showIndicator(e.currentTarget)}
              onFocus={(e) => showIndicator(e.currentTarget)}
              className="relative z-10 inline-flex h-[34px] items-center rounded-full px-3.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 justify-self-end">
          <ThemeToggle />
          <a
            href={REPO_URL}
            aria-label="Foodable on GitHub"
            title="Browse the code on GitHub"
            className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-raised hover:text-foreground group-data-[small=true]/pill:size-[34px]"
          >
            <GithubIcon className="size-[18px]" />
          </a>
          <a href="#self-host" className="rounded-full">
            <ShimmerButton
              type="button"
              tabIndex={-1}
              background="#28cf8b"
              shimmerColor="#ffffff"
              className="h-10 px-[18px] py-0 text-sm font-semibold text-[#062c1c] group-data-[small=true]/pill:h-[34px]"
            >
              Host it
            </ShimmerButton>
          </a>
        </div>
      </div>
    </header>
  );
}
