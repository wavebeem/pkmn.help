// Generates public/changelog/index.html: a plain, standalone HTML rendering of
// CHANGELOG.md, so people don't have to load GitHub (slow, and full of stuff
// they don't care about) just to see what's new.
//
// Run: npm run generate-changelog
//
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homeLink } from "./lib/homeLink.js";
import { markdown } from "./lib/markdown.js";

const changelog = await readFile("CHANGELOG.md", "utf-8");
const body = markdown.render(changelog);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Changelog - PKMN.help</title>
<link rel="stylesheet" href="/static.css" />
</head>
<body>
${homeLink}
${body}
${homeLink}
</body>
</html>
`;

await mkdir("public/changelog", { recursive: true });
await writeFile("public/changelog/index.html", html, "utf-8");
