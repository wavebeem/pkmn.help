import Papa from "papaparse";
import path from "path";
import fs from "fs";
import { readJSON } from "./readJSON";
import { saveJSON } from "./saveJSON";

function set(object: Record<string, any>, keys: string[], value: any): void {
  switch (keys.length) {
    case 0:
      throw new Error("what??");
    case 1: {
      const [key] = keys;
      object[key] = value;
      break;
    }
    default: {
      const [key, ...keys_] = keys;
      if (!object[key]) {
        object[key] = {};
      }
      return set(object[key], keys_, value);
    }
  }
}

async function main() {
  const lang = process.argv[2];
  if (!lang) {
    throw new Error(`no such language ${lang}`);
  }
  const csv = fs.readFileSync(`${lang}.csv`, "utf-8");
  const { data } = Papa.parse<string[]>(csv);
  const [, ...rows] = data;
  const translation = {};
  for (const [key, , other] of rows) {
    set(translation, key.split(/[.]/), other);
  }
  saveJSON(`../public/locales/${lang}-translation.json`, translation);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
