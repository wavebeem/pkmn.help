// TODO: drop once we're on a TypeScript version that types this natively.
declare global {
  interface RegExpConstructor {
    escape(string: string): string;
  }
}

// Consumed by navigateFallbackDenylist (vite.config.ts) and public/_redirects
// (bin/generate-static.ts). Entries: a path, or a prefix ending in "*".
export const filePaths = [
  "/assets/*",
  "/workbox-*",
  "/data-pkmn.json",
  "/locales/*",
  "/app-logo.svg",
  "/app-icon-*",
  "/fonts/*",
  "/img/*",
  "/cry/*",
  "/translations/*",
  "/manifest.webmanifest",
  "/sw.js",
];

export function filePathToRegExp(pattern: string): RegExp {
  if (pattern.endsWith("*")) {
    const prefix = RegExp.escape(pattern.slice(0, -1));
    return new RegExp(`^${prefix}`);
  }
  const exact = RegExp.escape(pattern);
  return new RegExp(`^${exact}$`);
}
