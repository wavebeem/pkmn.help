// Builds every standalone static page: licenses, changelog, credits, 404.
//
// Run: npm run generate-static
//
import { readFile } from "node:fs/promises";
import { getProjectLicenses } from "generate-license-file";
import escape from "escape-html";
import { html } from "./lib/html.js";
import { markdown } from "./lib/markdown.js";
import { writeTextFile } from "./lib/writeTextFile.js";

// lucide-static's "arrow-left" icon, read straight from its published SVG file.
const backIcon = await readFile(
  new URL(import.meta.resolve("lucide-static/icons/arrow-left.svg")),
  "utf-8",
);

// "Back to the app" link shown at the top of every static page below.
const homeLink = html`<nav>
  <a href="/" aria-label="Home">${backIcon}</a>
</nav>`;

// Shared shell for standalone static pages. Always includes the home link
// and an <h1> of the title.
function page({ title, body }: { title: string; body: string }): string {
  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title} &ndash; PKMN.help</title>
        <link rel="stylesheet" href="/static.css" />
      </head>
      <body>
        ${homeLink}
        <h1>${title}</h1>
        ${body}
      </body>
    </html>`;
}

// Markdown files here open with their own "# Title" heading, which page()
// already renders from the title, so drop it before rendering the rest.
function dropLeadingHeading(source: string): string {
  return source.replace(/^#[^\n]*\n+/, "");
}

async function generateLicenses(): Promise<void> {
  const licenses = await getProjectLicenses("package.json");
  licenses.sort((a, b) => a.dependencies[0].localeCompare(b.dependencies[0]));
  const sections = licenses
    .map(({ dependencies, content }) => {
      const heading = dependencies.map(escape).join(", ");
      return html`<section>
        <h2>${heading}</h2>
        <pre>${escape(content)}</pre>
      </section>`;
    })
    .join("\n");
  const body = html`<p>
      PKMN.help is built with the following open source packages.
    </p>
    <p>Thank you to everyone who makes and maintains them.</p>
    ${sections}`;
  await writeTextFile(
    "public/licenses/index.html",
    page({ title: "Open Source Licenses", body }),
  );
}

async function generateChangelog(): Promise<void> {
  const changelog = await readFile("CHANGELOG.md", "utf-8");
  const body = markdown.render(dropLeadingHeading(changelog));
  await writeTextFile(
    "public/changelog/index.html",
    page({ title: "Changelog", body }),
  );
}

async function generateCredits(): Promise<void> {
  const credits = await readFile("CREDITS.md", "utf-8");
  const body = markdown.render(dropLeadingHeading(credits));
  await writeTextFile(
    "public/credits/index.html",
    page({ title: "Credits", body }),
  );
}

async function generate404(): Promise<void> {
  const body = html`<p>
    If you see this page, email Sage (<a href="mailto:pkmn@wavebeem.com"
      ><strong>pkmn<wbr />@wavebeem.com</strong></a
    >) about it.
  </p>`;
  await writeTextFile(
    "public/404/index.html",
    page({ title: "404 File not found", body }),
  );
}

await Promise.all([
  generateLicenses(),
  generateChangelog(),
  generateCredits(),
  generate404(),
]);
