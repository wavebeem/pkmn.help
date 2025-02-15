import fs from "fs";
import Papa from "papaparse";
import { saveJSON } from "./util.js";
import { setPath } from "./lib/setPath.js";

async function main() {
  const [lang] = process.argv.slice(2);
  if (!lang) {
    throw new Error(`no such language ${lang}`);
  }
  const csv = fs.readFileSync(`${lang}.csv`, "utf-8");
  const { data } = Papa.parse<string[]>(csv);
  const [, ...rows] = data;
  const translation = {};
  for (const [key, , other] of rows) {
    if (other) {
      setPath(translation, key.split("."), other.trim());
    }
  }
  saveJSON(`public/locales/${lang}.json`, translation, {
    indent: 2,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
