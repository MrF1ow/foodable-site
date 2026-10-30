# AGENTS.md

Instructions for every coding agent working in this repo. `CLAUDE.md` and `GEMINI.md` are symlinks to this file, so edit only this one.

## What this is

The marketing site for [Foodable](https://github.com/MrF1ow/foodable), a free, open-source, self-hosted kitchen app for one household. Foodable covers the fridge, groceries, recipes and nutrition, and works through an MCP server plus a small web app. The site has one job: show people why it exists and get them to self-host it. There is no hosted service, sign-up or pricing, so never add any.

It is one page: Next.js 16 (App Router, `output: "export"`), Tailwind 4, and [Magic UI](https://magicui.design) components, which come from the shadcn registry.

## Commands

Use Bun for everything. Do not use npm, pnpm, yarn or npx.

- `bun install` installs dependencies.
- `bun dev` runs the dev server at http://localhost:3000.
- `bun run build` writes the static site to `out/`. Run it before every commit; it also typechecks.
- `bun run lint` runs ESLint.
- `bunx shadcn@latest add @magicui/<name>` adds a Magic UI component to `src/components/ui/`.

There is no formatter yet. Do not add Prettier: the owner wants Bun-only tooling. `bun fmt` will be adopted once Bun 1.4.4 is stable, and until then it exists only in canary. Match the surrounding style: 2-space indent, double quotes and semicolons in `src/components/site/`.

## Layout

- `src/app/page.tsx` puts the sections together in order: Nav, Hero, Story, Loop, Chat, Features, Screens, SelfHost, Faq, FinalCta, Footer.
- `src/components/site/` holds one file per section, plus the small helpers `logo.tsx`, `section-heading.tsx`, `themed-shot.tsx` and `github-icon.tsx`.
- `src/components/ui/` holds vendored shadcn / Magic UI components, kept as the registry ships them and excluded from lint. The one local change: `safari.tsx` and `iphone.tsx` add a per-instance `useId()` suffix to their SVG mask and clip ids. Keep that change if you re-pull them (see Gotchas).
- `src/lib/site.ts` holds the site, repo, docs and upstream URLs. Link through these constants and never hardcode the URLs.
- `src/app/globals.css` holds the theme tokens.
- `public/shots/` holds real app screenshots, `public/brand/` the logo SVGs.

## Brand and design

- **Slogan:** "Foodable, Making Food More Doable". On the page it runs in sentence case: the hero headline is "Making food more *doable*.", and it is also the browser tab title, the link-preview title and the footer tagline. Keep the name/"doable" rhyme intact, and keep the slogan as the headline.
- **One accent:** the logo green `#28cf8b` (`--brand`, also `--primary`), the same in light and dark. Text on a green fill is `#062c1c` (`--on-brand`, `text-on-brand`), never white. Soft green backgrounds use `--brand-soft`. Do not add other accent colors.
- **Fonts:** Bricolage Grotesque for headings (`font-heading`, applied to h1–h3 automatically) and Geist for body text.
- **Themes:** `next-themes` toggles the class, and the default follows the system setting. Every section must look right in both themes, so check both.
- **Logo:** use `LogoMark` / `Logo` from `logo.tsx`. The geometry matches `public/brand/mark.svg`, which is copied from the main repo's `src/brand.ts`. Never redraw it.
- **Voice:** friendly, plain, first person from the household that built it ("My wife and I…"). Use short sentences. Leave out marketing filler and fake testimonials or user counts.

## Facts must match the product

Every claim on the page must be true of the main repo. Check there before changing any number or feature claim:

- **Tool count (67)** comes from `src/mcp/tools-list.snapshot.json` in `MrF1ow/foodable`.
- **In-chat card count (8)** is the client-reachable entries in `WIDGET_TEMPLATES` in its `src/widgets.ts`. `component-gallery` is dev-only and not counted.
- **Tool names** in the Chat section's demo conversation must be real tools.
- **Supported clients:** any MCP client over HTTP with OAuth. The owner uses Claude and Grok.
- **Self-host steps** mirror `README.md` and `docs/self-hosting.md` there.

## Screenshots

`public/shots/*.png` are real app pages rendered from fixture data, not mockups. To regenerate them, run this in the main repo:

```bash
bun run preview:app   # serves fixture pages on http://localhost:4787/<page>-<light|dark>.html
```

Then capture each page with headless Chromium at device scale factor 2:

- `nutrition-{light,dark}.png` at 1200×700 (the Safari frame's screen ratio).
- `{fridge,grocery,recipe}-{light,dark}-mobile.png` at 390×844 (the iPhone frame's screen).

Each image ships in a light and a dark version, swapped with `<Themed light={…} dark={…} />`.

## Gotchas (each was a real bug here)

- **Duplicate SVG ids blank the device frames.** The Safari and iPhone frames mask their screens by id. With several frames on the page, and the dark twins inside `display: none`, a shared id breaks every other frame and the screenshot disappears. That is why the ids use `useId()`.
- **Swap themed content with wrapper divs.** Use `Themed` (wrapper divs) rather than `hidden dark:block` on a component that sets its own `display` (`inline-block`). Which class wins then depends on CSS order.
- **Marquees inside grid items cause horizontal overflow on mobile.** A grid item's `min-width: auto` grows to the marquee's full width, and the page was once 4364px wide at 390px. Two-column section grids use `[&>*]:min-w-0`, and `<main>` has `overflow-x-clip`. After any layout change, check the page at 390px wide.
- **Bento backgrounds are absolutely positioned.** They overlap a card's icon and title if they're too tall. Rows are `26rem` below `lg` and `22rem` at `lg` and up.
- **Static export only.** Do not add server features (route handlers, `next/image` optimization, ISR, middleware). `images.unoptimized` is on, and `<img>` is fine.

## Workflow

- Branch from `main` and open a PR. Do not push straight to `main`. CI runs `bun install --frozen-lockfile`, `bun run lint` and `bun run build`.
- Before calling a visual change done, look at it in light, dark and at 390px.
- Keep the page to one route. Smaller pieces of copy belong in the FAQ, not on new pages.
- Deploy: Cloudflare Workers static assets, serving `out/` at https://foodable.xyz (`wrangler.jsonc`). Cloudflare builds from GitHub on every push to `main` (build `bun run build`, deploy `bunx wrangler deploy`, env `BUN_VERSION`). There is no Worker script; keep it that way. `public/_headers` sets cache headers.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
