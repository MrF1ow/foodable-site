---
name: foodable-site-test
description: How to run, test and verify foodable-site safely - install, dev server, lint, static build, screenshots in light and dark at 1280 and 390 wide, and what not to touch. Use before running, testing or verifying foodable-site, or a change to it.
watches:
  - package.json#scripts
  - .github/workflows/ci.yml
  - next.config.ts
  - wrangler.jsonc
  - .agents/skills/foodable-site-test/shoot.ts
updated: "a75ffcd471e50fa5e610101b39bdc4f61e9a78e3"
---

# Run, test and verify foodable-site

One static page (Next.js 16, `output: "export"`), no server, no database, no env vars, no seed data. Bun only: never npm, pnpm, yarn or npx.

## Run it
- Install: `bun install --frozen-lockfile`
- Start: `bun dev` (port 3000; another port: `bun dev -p 4733`). Dev serves `/` fine but verify on the build, not on dev.
- Env: none. Seed data: none.

## Test it
There is no unit test framework. The checks are lint, the build (which also typechecks) and looking at the result.
- Lint: `timeout 300 bun run lint` (a few seconds)
- Build: `timeout 600 bun run build` writes the static site to `out/` (about 5 s warm)
- CI runs `.github/workflows/ci.yml` on every PR and push to `main`: `bun install --frozen-lockfile`, `bun run lint`, `bun run build` (Bun 1.4.2).

## Verify on the real thing
Verify the exported `out/`, not the dev server. Build, serve `out/`, then shoot it. Pick a free port in 4100-4999.

```bash
timeout 600 bun run build
python3 -m http.server 4731 -d out --bind 127.0.0.1 &   # note $! to stop it later
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4731/        # 200
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4731/nope    # 404 (the 404 page)

SHOOT_TMP=<scratch dir> timeout 120 bun .agents/skills/foodable-site-test/shoot.ts http://127.0.0.1:4731/ <outdir>
```

`shoot.ts` drives `/usr/bin/chromium` over the DevTools Protocol with no dependencies (works offline; `playwright-core` is not a repo dependency). It writes full-page `<outdir>/{light,dark}-{1280,390}.png` (1280x800 and 390x844 viewports, grown to the page height), takes about 20 s, and prints one JSON line per shot: `scrollWidth`, `innerWidth`, `overflow` (must be `false`, the 390px check from AGENTS.md) and the `<html>` class (`light` or `dark`). Look at the PNGs with the Read tool; they are tall, so crop with PIL (`python3 -I`) to see detail.
- `--eval "<js expression>"` adds its result to each JSON line, e.g. `--eval 'document.title'`.
- `--click "<css selector>"` clicks the first match before the shot, e.g. `--click 'button[aria-label="Toggle dark mode"]'` (the nav toggle; the first match may be hidden at 390).
- Dark comes from emulated `prefers-color-scheme`, which next-themes follows (`defaultTheme` is system). Chromium's `--force-dark-mode` also works for a one-off, but emulation is what the script uses. A plain `chromium --headless=new --screenshot=...` only captures the viewport and catches the hero mid-animation, so prefer `shoot.ts`.
- `shoot.ts` grows the viewport to the full page so scroll-triggered (`inView`) reveals fire, then un-pauses any left. Counters may be caught mid-count. It does not prove the entrances play on scroll.
- JS off: the static HTML must still carry the content. `grep -c "Making food more" out/index.html` and the same for any heading or copy you changed; the hero must not depend on JS. Elements with `opacity:0` in the HTML are entrance animations that play in CSS, not hidden content.
- Responsive: the 390 shots and their `overflow` flag are the mobile check; a marquee in a grid item without `min-w-0` shows up as `scrollWidth` far above 390.

## Ways to hurt yourself
- Pushing to `main` deploys: Cloudflare builds and deploys https://foodable.xyz from every push to `main`. Never push `main`; branch and open a PR. Never run `bunx wrangler deploy` yourself.
- Port 3000 may be held by another checkout's dev server: check `ss -ltn | grep :3000` or use `bun dev -p <port>`. Dev and build share `.next/` in a checkout, so do not run both at once in one checkout.
- Wrap `bun run build` and `bun run lint` in `timeout`; a hung build otherwise blocks the shell.
- Static export only: no route handlers, `next/image` optimization, ISR or middleware, or `next build` fails. `out/` and `.next/` are gitignored; do not commit them.
- Do not use `pkill -f` or kill by name: Chromium and dev servers from other sessions are running on this machine.

## Clean up
- Stop the static server and any dev server by the PID you got from `$!`.
- `shoot.ts` starts its own Chromium on a random debugging port and kills it on exit; its profile is under `$SHOOT_TMP` (default the system temp dir), delete the `shoot-*` dirs if you care.
- Keep screenshots out of the repo.
