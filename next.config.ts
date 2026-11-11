import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slashes are removed by src/proxy.ts, in the same hop as the
  // language redirects (old "/about/" → "/fr/about" directly, not 308 + 301).
  skipTrailingSlashRedirect: true,
  // Dev only (ignored in production): let a phone on the local network load
  // the dev server's JavaScript via the Mac's network address. Without it,
  // Next.js blocks those requests and the page never becomes interactive.
  // If the Mac gets a different IP address, update it here.
  allowedDevOrigins: ["192.168.1.28"],
  images: {
    remotePatterns: [
      // Unsplash placeholders (mock data)
      { protocol: "https", hostname: "images.unsplash.com" },
      // Apimo CDN — exact hostnames vary across the platform; we whitelist all
      // common ones so any agency's media works once env vars are set.
      { protocol: "https", hostname: "**.apimo.pro" },
      { protocol: "https", hostname: "d1qfj231ug7wdu.cloudfront.net" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
};

export default nextConfig;
