import type { ReactNode } from "react";

/** Redesign screenshots: public/shots/<kind>/<name>-<theme>.webp. */
export function shot(
  kind: "app" | "phone" | "chat",
  name: string,
  theme: "light" | "dark",
) {
  return `/shots/${kind}/${name}-${theme}.webp`;
}

/**
 * The old screenshots in public/shots. This goes away, with those files, once
 * every section uses the new shots.
 */
export function legacyShot(
  name: string,
  theme: "light" | "dark",
  mobile = false,
) {
  return `/shots/${name}-${theme}${mobile ? "-mobile" : ""}.webp`;
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
