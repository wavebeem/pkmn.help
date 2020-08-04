import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const mainURL =
  "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number";

const statsURL =
  "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VIII-present)";

const CODE_POINT_A = "a".codePointAt(0)!;

function chr(n: number): string {
  return String.fromCodePoint(CODE_POINT_A + n);
}

function text(elem: Element): string {
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
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

async function documentForURL(url: string): Promise<Document> {
  const html = await fetch(url).then((r) => r.text());
  const { window } = new JSDOM(html);
  const { document } = window;
  return document;
}

async function fillStats(monsters: Monster[]): Promise<void> {
  const document = await documentForURL(statsURL);
  const map = new Map<number, number>();
  for (const row of document.querySelectorAll("table.sortable tbody tr")) {
    const columns = [...row.querySelectorAll("td")].map(text);
    const number = Number(columns[0]);
    // const name = Number(columns[2]);
    const [hp, attack, defense, spAttack, spDefense, speed] = columns
      .slice(3, 9)
      .map(Number);
    const count = map.get(number) || 0;
    map.set(number, count + 1);
    const suffix = count > 0 ? chr(count) : "";
    const id = `pkmn-${number}${suffix}`;
    // TODO: How to deal with "forms"
    for (const mon of monsters) {
      if (mon.id === id) {
        mon.hp = hp;
        mon.attack = attack;
        mon.defense = defense;
        mon.spAttack = spAttack;
        mon.spDefense = spDefense;
        mon.speed = speed;
      }
    }
  }
}

async function fetchData(): Promise<{
  monsters: Monster[];
  downloads: Download[];
}> {
  const document = await documentForURL(mainURL);
  const downloads: Download[] = [];
  const monsters: Monster[] = [];
  const map = new Map<number, number>();
  for (const table of document.querySelectorAll("table")) {
    const firstHeader = table.querySelector("th");
    if (firstHeader && text(firstHeader).endsWith("dex")) {
      for (const row of table.querySelectorAll("tr")) {
        const elements = [...row.querySelectorAll("td, th")];
        const data = elements.map((d) => text(d));
        if (data.length <= 0) {
          continue;
        }
        const type1 = data[4].toLowerCase();
        const type2 = data[5] ? data[5].toLowerCase() : undefined;
        const name = data[3];
        const number = Number(data[1].slice(1));
        if (Number.isNaN(number)) {
          continue;
        }
        const count = map.get(number) || 0;
        map.set(number, count + 1);
        const suffix = count > 0 ? chr(count) : "";
        const id = `pkmn-${number}${suffix}`;
        const types = [type1];
        if (type2) {
          types.push(type2);
        }
        const image = elements[2]
          ? elements[2].querySelector("img")?.src.replace(/^[/]{2}/, "https://")
          : null;
        monsters.push({
          id,
          name,
          number,
          types,
          hp: 0,
          attack: 0,
          defense: 0,
          spAttack: 0,
          spDefense: 0,
          speed: 0,
        });
        if (image) {
          downloads.push({ image, id });
        }
      }
    }
  }
  await fillStats(monsters);
  return { monsters, downloads };
}

// async function sleep(ms: number): Promise<void> {
//   return await new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

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
      console.log(`${dl.id} => ${dl.image}`);
      const buffer = await fetch(dl.image).then((r) => r.buffer());
      fs.writeFileSync(filename, buffer);
      execSync(`\
        mogrify \
          -background none \
          -gravity center \
          -extent 68x68 \
          -scale 272x272 \
          '${filename}' \
      `);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
