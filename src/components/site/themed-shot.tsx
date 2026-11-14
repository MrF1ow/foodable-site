import type { ReactNode } from "react";

/** Redesign screenshots: public/shots/<kind>/<name>-<theme>.webp. */
export function shot(
  kind: "app" | "phone" | "chat",
  name: string,
  theme: "light" | "dark",
) {
  return `/shots/${kind}/${name}-${theme}.webp`;
}

/** Shows `light` in light mode and `dark` in dark mode. */
export function Themed({ light, dark }: { light: ReactNode; dark: ReactNode }) {
  return (
    <>
      <div className="dark:hidden">{light}</div>
      <div className="hidden dark:block">{dark}</div>
    </>
  );
}
