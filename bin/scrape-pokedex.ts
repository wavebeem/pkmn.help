import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import path from "path";
import fs from "fs";

const mainURL =
  "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number";

const CODE_POINT_A = "a".codePointAt(0)!;

function chr(n: number): string {
  return String.fromCodePoint(CODE_POINT_A + n);
}

function text(elem: HTMLElement): string {
  return (elem.textContent || "").trim();
}

interface Download {
  image: string;
  id: string;
}

interface Monster {
  id: string;
  name: string;
  number: number;
  types: string[];
}

async function fetchData(): Promise<{
  monsters: Monster[];
  downloads: Download[];
}> {
  const html = await fetch(mainURL).then(r => r.text());
  const { window } = new JSDOM(html);
  const { document } = window;
  const downloads: Download[] = [];
  const monsters: Monster[] = [];
  const map = new Map();
  for (const table of document.querySelectorAll("table")) {
    const firstHeader = table.querySelector("th");
    if (firstHeader && text(firstHeader).endsWith("dex")) {
      for (const row of table.querySelectorAll("tr")) {
        const elements = [...row.querySelectorAll("td")];
        const data = elements.map(d => text(d));
        if (data.length <= 0) {
          continue;
        }
        const type1 = data[4].toLowerCase();
        const type2 = data[5] ? data[5].toLowerCase() : undefined;
        const name = data[3];
        const number = Number(data[1].slice(1));
        const count = map.get(number) || 0;
        map.set(number, count + 1);
        const suffix = count > 0 ? chr(count) : "";
        const id = `pkmn-${number}${suffix}`;
        const types = [type1];
        if (type2) {
          types.push(type2);
        }
        const image = elements[2]
          ? elements[2].querySelector("img")!.src.replace(/^[/]{2}/, "https://")
          : null;
        monsters.push({ id, name, number, types });
        if (image) {
          downloads.push({ image, id });
        }
      }
    }
  }
  return { monsters, downloads };
}

async function sleep(ms: number): Promise<void> {
  return await new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main(): Promise<void> {
  const { monsters, downloads } = await fetchData();
  fs.writeFileSync(
    path.resolve(__dirname, "../src/data-pkmn.json"),
    JSON.stringify(monsters, null, 2),
    "utf-8"
  );
  for (const dl of downloads) {
    const filename = path.resolve(__dirname, `../img/${dl.id}.png`);
    if (!fs.existsSync(filename)) {
      console.log(`Downloading ${dl.image} to ${filename}`);
      const buffer = await fetch(dl.image).then(r => r.buffer());
      fs.writeFileSync(filename, buffer);
      await sleep(250);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
