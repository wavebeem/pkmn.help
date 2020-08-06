import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { URL } from "url";
import groupBy from "lodash.groupby";

const DEX_SLOWBRO = 80;

const mainURL =
  "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number";

const statsURL =
  "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VIII-present)";

const CODE_POINT_A = "a".codePointAt(0)!;

function chr(n: number): string {
  return String.fromCodePoint(CODE_POINT_A + n);
}

function suffix(n: number, i: number): string {
  if (i === 0) {
    return String(n);
  }
  return `${n}${chr(i)}`;
}

function text(elem: Element): string {
  return (elem.textContent || "").trim();
}

interface MonsterStats {
  bulbapediaURL: string;
  imageURL: string;
  name: string;
  formName: string;
  number: number;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

interface MonsterDex {
  bulbapediaURL: string;
  imageURL: string;
  name: string;
  number: number;
  types: string[];
}

interface Monster extends MonsterStats, MonsterDex {
  id: string;
}

const dex: MonsterDex[] = [];
const stats: MonsterStats[] = [];
const monsters: Monster[] = [];

function normalizeURL(url: string | undefined, base: string): string {
  if (!url) {
    return "";
  }
  return new URL(url, base).toString();
}

async function documentForURL(url: string): Promise<Document> {
  const html = await fetch(url).then((r) => r.text());
  const { window } = new JSDOM(html);
  const { document } = window;
  return document;
}

async function fillStats(): Promise<void> {
  const document = await documentForURL(statsURL);
  for (const row of document.querySelectorAll("table.sortable tbody tr")) {
    const elements = [...row.querySelectorAll("td")];
    const columns = elements.map(text);
    const number = Number(columns[0]);
    if (Number.isNaN(number)) {
      continue;
    }
    const [, name = "", formName = ""] =
      columns[2].match(/^([^()]+?)\s*(?:[(]([^()]+)[)])?$/) || [];
    const imageURL = normalizeURL(
      elements[1]?.querySelector("img")?.src,
      statsURL
    );
    const bulbapediaURL = normalizeURL(
      elements[2]?.querySelector("a")?.href ?? "",
      statsURL
    );
    const [hp, attack, defense, spAttack, spDefense, speed] = columns
      .slice(3, 9)
      .map(Number);
    stats.push({
      name,
      formName,
      number,
      bulbapediaURL,
      imageURL,
      hp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed,
    });
  }
}

async function fillDex(): Promise<void> {
  const document = await documentForURL(mainURL);
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
        const bulbapediaURL = normalizeURL(
          elements[3]?.querySelector("a")?.href ?? "",
          mainURL
        );
        const number = Number(data[1].slice(1));
        if (Number.isNaN(number)) {
          continue;
        }
        const types = [type1];
        if (type2) {
          types.push(type2);
        }
        const imageURL = normalizeURL(
          elements[2].querySelector("img")?.src,
          mainURL
        );
        dex.push({
          bulbapediaURL,
          imageURL,
          name,
          number,
          types,
        });
      }
    }
  }
}

// async function sleep(ms: number): Promise<void> {
//   return await new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

function combineData() {
  const dexByNumber = groupBy(dex, (o) => o.number);
  const statsByNumber = groupBy(stats, (o) => o.number);
  for (const num of Object.keys(dexByNumber)) {
    const da = dexByNumber[num];
    const sa = statsByNumber[num];
    // I'm going to assume that if the stats page and dex page have the same
    // number of entries for a particular Pokémon number, they are for the same
    // forms in the same order. I hope I'm not wrong on this one!
    if (da.length === sa.length) {
      for (let i = 0; i < da.length; i++) {
        const d = da[i];
        const s = sa[i];
        monsters.push({
          ...s,
          id: `pkmn-${suffix(Number(num), i)}`,
          types: d.types,
        });
      }
    } else if (da.length === 1) {
      const [d] = da;
      let i = 0;
      for (const s of sa) {
        monsters.push({
          ...s,
          id: `pkmn-${suffix(Number(num), i)}`,
          types: d.types,
        });
        i++;
      }
    } else if (sa.length === 1) {
      const [s] = sa;
      let i = 0;
      for (const d of da) {
        monsters.push({
          ...s,
          id: `pkmn-${suffix(Number(num), i)}`,
          types: d.types,
          imageURL: d.imageURL,
        });
        i++;
      }
    } else if (Number(num) === DEX_SLOWBRO) {
      // Regular Slowbro
      monsters.push({
        ...sa[0],
        id: `pkmn-${suffix(Number(num), 0)}`,
        types: da[0].types,
        imageURL: da[0].imageURL,
      });
      // Mega Slowbro
      monsters.push({
        ...sa[1],
        id: `pkmn-${suffix(Number(num), 1)}`,
        types: da[0].types,
        imageURL: da[0].imageURL,
      });
      // Galarian Slowbro
      monsters.push({
        ...sa[2],
        id: `pkmn-${suffix(Number(num), 2)}`,
        types: da[1].types,
        imageURL: da[1].imageURL,
      });
    } else {
      console.error(
        `Skipping #${num} ${da[0].name} (dex=${da.length} stats=${sa.length})`
      );
    }
    delete dexByNumber[num];
    delete statsByNumber[num];
  }
  saveJSON("../build/data-dexByNumber.json", dexByNumber);
  saveJSON("../build/data-statsByNumber.json", statsByNumber);
}

function saveJSON(filename: string, data: any): void {
  fs.writeFileSync(
    path.resolve(__dirname, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

async function downloadImages() {
  for (const mon of monsters) {
    const filename = path.resolve(__dirname, `../img/${mon.id}.png`);
    if (!fs.existsSync(filename) && mon.imageURL) {
      console.log(`${mon.id} => ${mon.imageURL}`);
      const buffer = await fetch(mon.imageURL).then((r) => r.buffer());
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

async function main(): Promise<void> {
  await fillDex();
  await fillStats();
  saveJSON("../build/data-stats.json", stats);
  saveJSON("../build/data-dex.json", dex);
  combineData();
  saveJSON(
    "../src/data-pkmn.json",
    monsters.map((mon) => {
      return { ...mon, imageURL: undefined };
    })
  );
  await downloadImages();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
