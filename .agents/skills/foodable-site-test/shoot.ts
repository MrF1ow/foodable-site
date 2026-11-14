// Headless Chromium driver over the DevTools Protocol. No dependencies: Bun's
// built-in fetch and WebSocket, and /usr/bin/chromium. Works offline.
//
//   bun .agents/skills/foodable-site-test/shoot.ts <url> <outdir> [--eval "<js>"] [--click "<css selector>"]
//
// For light and dark, at 1280x800 and 390x844, it writes <outdir>/<theme>-<width>.png
// (full page; inView reveals are forced on) and prints one JSON line per shot with scrollWidth, innerWidth,
// overflow (scrollWidth > innerWidth) and the html class. --click clicks the
// first match before the shot; --eval prints the result of a JS expression.
import { spawn } from "bun";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (n: string) => {
  const i = args.indexOf(n);
  return i < 0 ? undefined : args.splice(i, 2)[1];
};
const evalJs = flag("--eval");
const click = flag("--click");
const [url, outdir] = args;
if (!url || !outdir) throw new Error("usage: shoot.ts <url> <outdir>");
mkdirSync(outdir, { recursive: true });

// Fresh profile each run (no stored theme). Port 0 = Chromium picks a free one.
const profile = mkdtempSync(join(process.env.SHOOT_TMP ?? tmpdir(), "shoot-"));
const chrome = spawn(
  [
    "/usr/bin/chromium", "--headless=new", "--no-sandbox",
    "--hide-scrollbars", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
    // Headless Chromium stops producing frames for a tab it thinks is in the
    // background, so IntersectionObserver never fires and inView sections stay
    // blank (it hit the second theme of every run). Keep it rendering.
    "--disable-renderer-backgrounding", "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "about:blank",
  ],
  { stdout: "ignore", stderr: "ignore" },
);

try {
  let port = "";
  for (let i = 0; i < 100 && !port; i++) {
    await Bun.sleep(100);
    try { port = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0]; } catch {}
  }
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  const ws = new WebSocket((targets as { type: string; webSocketDebuggerUrl: string }[]).find((t) => t.type === "page")!.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const waiting = new Map<number, (v: { error?: { message: string }; result?: unknown }) => void>();
  ws.onmessage = (e) => {
    const m = JSON.parse(String(e.data));
    if (m.id && waiting.has(m.id)) waiting.get(m.id)!(m);
  };
  const send = (method: string, params: object = {}) =>
    new Promise<{ data: string; result: { value: string } }>((res, rej) => {
      const n = ++id;
      waiting.set(n, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result as { data: string; result: { value: string } })));
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  const js = async (expression: string) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true })).result.value;
  await send("Page.bringToFront");
  await send("Emulation.setFocusEmulationEnabled", { enabled: true });

  for (const theme of ["light", "dark"]) {
    for (const [width, height] of [[1280, 800], [390, 844]]) {
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
      await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: theme }] });
      await send("Page.navigate", { url });
      await Bun.sleep(1500);
      // Full page: grow the viewport to the page height so every IntersectionObserver
      // reveal (Reveal inView, motion whileInView) sees its element; scrolling a
      // 10000px page frame by frame is far slower in software-rendered headless.
      const h = await js("document.documentElement.scrollHeight");
      await send("Emulation.setDeviceMetricsOverride", { width, height: h, deviceScaleFactor: 1, mobile: width < 600 });
      await Bun.sleep(800);
      // `Reveal inView` sections stay paused until an IntersectionObserver fires,
      // which headless Chromium sometimes misses. Un-pause any that are left.
      await js(`document.head.append(Object.assign(document.createElement("style"),{textContent:'[class*="animation-play-state"]{animation-play-state:running!important}'}))`);
      await Bun.sleep(1500);
      if (click) {
        await js(`document.querySelector(${JSON.stringify(click)})?.click()`);
        await Bun.sleep(500);
      }
      const m = await js(`JSON.stringify({theme:${JSON.stringify(theme)},innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,htmlClass:document.documentElement.className,eval:${evalJs ? `(${evalJs})` : "null"}})`);
      const shot = await send("Page.captureScreenshot", { format: "png" });
      const file = join(outdir, `${theme}-${width}.png`);
      writeFileSync(file, Buffer.from(shot.data, "base64"));
      console.log(m, file);
    }
  }
  ws.close();
} finally {
  chrome.kill();
}
