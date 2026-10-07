// Builds Netlify's _redirects and _headers.
//
// Run: npm run generate-netlify
//
import { writeTextFile } from "./lib/writeTextFile.js";
import { filePaths } from "../vite/filePaths.js";

type RedirectRule = [from: string, to: string, status: 200 | 404];

// Serves `to` at `from` without changing the URL (rewrite or proxy)
function redirectOk(from: string, to: string): RedirectRule {
  return [from, to, 200];
}

function redirectNotFound(from: string): RedirectRule {
  return [from, "/404/index.html", 404];
}

function redirectRules(rules: RedirectRule[]): RedirectRule[] {
  return rules;
}

function formatRedirects(rules: RedirectRule[]): string {
  let content = "";
  for (const [from, to, status] of rules) {
    content += `${from} ${to} ${status}\n`;
  }
  return content;
}

async function generateRedirects(): Promise<void> {
  // Netlify uses the first matching rule, so order matters:
  // - File 404s first, so a missing file doesn't get the SPA shell (see
  //   vite/filePaths.ts)
  // - Plausible proxy next
  // - SPA shell fallback last
  const rules = redirectRules([
    ...filePaths.map(redirectNotFound),
    redirectOk("/p/js/script.js", "https://plausible.io/js/script.js"),
    redirectOk("/p/api/event", "https://plausible.io/api/event"),
    redirectOk("/*", "/index.html"),
  ]);
  await writeTextFile("public/_redirects", formatRedirects(rules));
}

// Path -> (header -> value)
type HeaderRules = Record<string, Record<string, string>>;

function headerRules(rules: HeaderRules): HeaderRules {
  return rules;
}

function formatHeaders(rules: HeaderRules): string {
  let content = "";
  for (const [path, headers] of Object.entries(rules)) {
    content += `${path}\n`;
    for (const [name, value] of Object.entries(headers)) {
      content += `  ${name}: ${value}\n`;
    }
  }
  return content;
}

async function generateHeaders(): Promise<void> {
  const contentSecurityPolicy = [
    "default-src 'self'",
    "img-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "frame-ancestors 'self'",
  ].join("; ");
  const rules = headerRules({
    "/*": {
      "Content-Security-Policy": contentSecurityPolicy,
    },
    // "/manifest.webmanifest": {
    //   "Content-Type": "application/manifest+json",
    // },
  });
  await writeTextFile("public/_headers", formatHeaders(rules));
}

await Promise.all([generateRedirects(), generateHeaders()]);
