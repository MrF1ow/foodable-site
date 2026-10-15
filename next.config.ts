import type { NextConfig } from "next";

// Static export: the marketing site is plain HTML/CSS/JS and can be hosted
// anywhere (GitHub Pages, Cloudflare Pages, Netlify, Vercel, a bucket).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
