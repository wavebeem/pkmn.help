// Builds Netlify's _redirects and _headers.
//
// Run: npm run generate-netlify
//
import { writeTextFile } from "./lib/writeTextFile.js";
import { filePaths } from "../vite/filePaths.js";

async function generateRedirects(): Promise<void> {
  // Netlify uses the first matching rule, so order matters:
  // - File 404s first, so a missing file doesn't get the SPA shell (see
  //   vite/filePaths.ts)
  // - Plausible proxy next
  // - SPA shell fallback last
  const content = formatRedirects([
    ...filePaths.map(redirectNotFound),
    redirectOk("/p/js/script.js", "https://plausible.io/js/script.js"),
    redirectOk("/p/api/event", "https://plausible.io/api/event"),
    redirectOk("/*", "/index.html"),
  ]);
  await writeTextFile("public/_redirects", content);
}

async function generateHeaders(): Promise<void> {
  const contentSecurityPolicy = [
    "default-src 'self'",
    "img-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "frame-ancestors 'self'",
  ].join("; ");
  const content = formatHeaders({
    "/*": {
      "Content-Security-Policy": contentSecurityPolicy,
    },
    // Netlify serves the wrong Content-Type for .webmanifest by default
    "/manifest.webmanifest": {
      "Content-Type": "application/manifest+json",
    },
  });
  await writeTextFile("public/_headers", content);
}

// Serves `to` at `from` without changing the URL (rewrite or proxy)
function redirectOk(from: string, to: string): string {
  return `${from} ${to} 200`;
}

function redirectNotFound(from: string): string {
  return `${from} /404/index.html 404`;
}

function formatRedirects(rules: string[]): string {
  let content = "";
  for (const rule of rules) {
    content += `${rule}\n`;
  }
  return content;
}

// Path -> (header -> value)
function formatHeaders(rules: Record<string, Record<string, string>>): string {
  let content = "";
  for (const [path, headers] of Object.entries(rules)) {
    content += `${path}\n`;
    for (const [name, value] of Object.entries(headers)) {
      content += `  ${name}: ${value}\n`;
    }
  }
  return content;
}

await Promise.all([generateRedirects(), generateHeaders()]);
