import { cn } from "@/lib/utils";

/** The Foodable mark, same geometry as public/brand/mark.svg. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 858 810"
      fill="currentColor"
      aria-hidden
      className={cn("text-brand", className)}
    >
      <path d="M0 810V458A416 458 0 0 1 416 0H858C858 208 716 379 506 379H382A26.5 26.5 0 0 1 382 325H592A25 25 0 0 0 592 275H380A26 26 0 0 1 380 222H592A24.5 24.5 0 0 0 592 173H316A93 93 0 0 0 240 316C146 368 79 458 79 578V810Z" />
      <path d="M436 477H622C622 658 516 810 336 810H116C116 618 246 477 436 477Z" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className="size-7" />
      <span className="font-heading text-xl font-bold tracking-tight">
        Foodable
      </span>
    </span>
  );
}
