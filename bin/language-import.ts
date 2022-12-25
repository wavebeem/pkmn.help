import fs from "fs";
import Papa from "papaparse";
import { saveJSON } from "./util";

/**
 * Set a deeply nested property on an object
 *
 * @example
 * set(object, ["key1", "key2", 3, "key4"], "value");
 */
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
  const [, , lang] = process.argv;
  if (!lang) {
    throw new Error(`no such language ${lang}`);
  }
  const csv = fs.readFileSync(`${lang}.csv`, "utf-8");
  const { data } = Papa.parse<string[]>(csv);
  const [, ...rows] = data;
  const translation = {};
  for (const [key, , other] of rows) {
    if (other) {
      set(translation, key.split("."), other.trim());
    }
  }
  saveJSON(`../public/locales/${lang}-translation.json`, translation);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
