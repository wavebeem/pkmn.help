// Generates public/licenses/index.html: a styled page listing the licenses of
// every production npm dependency, grouped by identical license text.
//
// Run: npm run generate-licenses
//
import { getProjectLicenses } from "generate-license-file";
import escape from "escape-html";
import { mkdir, writeFile } from "node:fs/promises";
import { homeLink } from "./lib/homeLink.js";

const licenses = await getProjectLicenses("package.json");
licenses.sort((a, b) => a.dependencies[0].localeCompare(b.dependencies[0]));

const sections = licenses
  .map(({ dependencies, content }) => {
    const heading = dependencies.map(escape).join(", ");
    return `<section>
<h2>${heading}</h2>
<pre>${escape(content)}</pre>
</section>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Open Source Licenses - PKMN.help</title>
<link rel="stylesheet" href="/static.css" />
</head>
<body>
${homeLink}
<h1>Open Source Licenses</h1>
<p>PKMN.help is built with the following open source packages.</p>
<p>Thank you to everyone who makes and maintains them.</p>
${sections}
${homeLink}
</body>
</html>
`;

await mkdir("public/licenses", { recursive: true });
await writeFile("public/licenses/index.html", html, "utf-8");
