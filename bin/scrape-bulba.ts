import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import path from "path";
import { saveJSON } from "./saveJSON";

const DEST = path.resolve(__dirname, "../data/bulba.json");
const DEX_URL =
  "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number";

async function main() {
  const resp = await fetch(DEX_URL);
  const html = await resp.text();
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const obj: Record<string, string> = {};
  for (const table of document.querySelectorAll("h3 + table")) {
    for (const row of table.querySelectorAll("tr")) {
      const items = Array.from(row.querySelectorAll("td"));
      // Protect against table layout changes in the future...
      //
      //     Local Dex | National Dex | Name+URL | Type 1 | Type 2
      //
      if (items.length === 4 || items.length === 5) {
        const num = items[1].textContent?.replace(/^#0*/, "")?.trim() ?? "";
        const url = new URL(
          items[2].querySelector("a")?.href?.trim() ?? "",
          DEX_URL
        ).href;
        obj[num] = url;
      }
    }
  }
  saveJSON(DEST, obj);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
