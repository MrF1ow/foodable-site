# foodable-site

The marketing site for [Foodable](https://github.com/MrF1ow/foodable), the self-hosted kitchen app for one household.

Next.js (static export) + Tailwind 4 + [Magic UI](https://magicui.design) components.

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # static site in out/
bun run lint
```

`out/` is plain HTML, CSS and JS, so it can go on GitHub Pages, Cloudflare Pages, Netlify, Vercel or any bucket.

## Agent files

`AGENTS.md` is the only instructions file. Codex, Cursor, Copilot, OpenCode and Grok read it directly. `CLAUDE.md` and `GEMINI.md` are symlinks to it for Claude Code and Gemini CLI. Edit only `AGENTS.md`. Agent-specific notes go in a section headed with the agent name.

## Layout

- `src/app/page.tsx` assembles the sections in `src/components/site/`.
- `src/components/ui/` holds the shadcn / Magic UI components as the registry ships them (`bunx shadcn@latest add @magicui/<name>`). They are excluded from lint. Local change: `safari.tsx` and `iphone.tsx` give their SVG mask ids a per-instance `useId()` suffix, because several frames share the page and the light/dark twins sit in `display: none` wrappers, which breaks a shared id.
- `src/lib/site.ts` holds the repo and docs URLs.

## Screenshots

`public/shots/` are real app screens from the main repo's fixture preview, one per theme:

```bash
# in the foodable repo
bun run preview:app     # serves fixture pages on :4787
# then, per page and theme (desktop 1200x700 for the Safari frame, 390x844 for the iPhone frame):
chromium --headless=new --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1200,700 --screenshot=nutrition-light.png \
  http://localhost:4787/nutrition-light.html
```

Brand assets in `public/brand/`, `src/app/favicon.ico` and `public/apple-touch-icon.png` are copied from the main repo (`bun run gen:icons` there). Accent is the logo green `#28cf8b`; text on it is `#062c1c`.
