import type { ReactNode } from "react";

/** Screenshots live in public/shots, one per theme, taken from the real app. */
export function shot(name: string, theme: "light" | "dark", mobile = false) {
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
