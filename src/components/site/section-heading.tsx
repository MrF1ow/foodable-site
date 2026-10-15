import type { ReactNode } from "react";

import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <BlurFade inView className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-sm font-semibold tracking-wider text-brand uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-bold text-balance sm:text-5xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-5 text-lg text-balance text-muted-foreground">
          {children}
        </p>
      ) : null}
    </BlurFade>
  );
}
