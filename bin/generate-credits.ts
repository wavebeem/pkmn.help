// Generates public/credits/index.html: a plain, standalone HTML rendering of
// CREDITS.md, so people don't have to load GitHub (slow, and full of stuff they
// don't care about) just to see who helped.
//
// Run: npm run generate-credits
//
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homeLink } from "./lib/homeLink.js";
import { markdown } from "./lib/markdown.js";

const credits = await readFile("CREDITS.md", "utf-8");
const body = markdown.render(credits);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Credits - PKMN.help</title>
<link rel="stylesheet" href="/static.css" />
</head>
<body>
${homeLink}
${body}
${homeLink}
</body>
</html>
`;

await mkdir("public/credits", { recursive: true });
await writeFile("public/credits/index.html", html, "utf-8");
