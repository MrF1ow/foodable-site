import { REPO_URL } from "@/lib/site";

import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "#story", label: "Our story" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#self-host", label: "Self-host" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label="Foodable home">
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={REPO_URL}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <GithubIcon className="size-4" />
            <span className="hidden sm:inline">Get the code</span>
            <span className="sm:hidden">Code</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
