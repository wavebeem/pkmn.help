import { readJSON, saveJSON } from "./util.js";
import { allLanguages } from "../src/misc/lang.js";
import { existsSync } from "node:fs";

function deletePath(object: any, path: readonly string[]): void {
  if (!object) {
    return;
  }
  switch (path.length) {
    case 0: {
      throw new Error(`no such path`);
    }
    case 1: {
      const [last] = path;
      delete object[last];
      break;
    }
    default: {
      const [first, ...rest] = path;
      deletePath(object[first], rest);
      break;
    }
  }
}

async function main() {
  const key = process.argv[2];
  if (!key) {
    throw new Error(`missing key to delete`);
  }
  for (const lang of allLanguages) {
    console.log(lang);
    const langFile = `public/locales/${lang}.json`;
    if (!existsSync(langFile)) {
      continue;
    }
    const obj = readJSON(langFile);
    deletePath(obj, key.split("."));
    saveJSON(langFile, obj, { indent: 2 });
    // break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
