"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

// A blur-and-drop entrance in plain CSS, used by every section so they all
// move the same way. Without `inView` it plays as soon as the HTML paints,
// which keeps the hero (and the LCP screenshot) off the JavaScript path.
// With `inView` it waits, paused on its first frame, until scrolled to.
const ENTER =
  "motion-safe:animate-in fade-in blur-in-[6px] slide-in-from-top-[6px] fill-mode-both duration-400 ease-[cubic-bezier(0,0,0.58,1)]";

export function Reveal({
  children,
  className,
  delay = 0,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds, on top of a 40ms base. */
  delay?: number;
  inView?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(!inView);

  useEffect(() => {
    const el = ref.current;
    if (shown || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-50px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={cn(ENTER, !shown && "[animation-play-state:paused]!", className)}
      style={
        { "--tw-animation-delay": `${40 + delay * 1000}ms` } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
