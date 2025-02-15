import { readJSON, saveJSON } from "./util.js";
import { allLanguages } from "../src/misc/lang.js";
import { existsSync } from "node:fs";
import { getPath } from "./lib/getPath.js";
import { setPath } from "./lib/setPath.js";

async function main() {
  const [fromKey, toKey] = process.argv.slice(2);
  if (!(fromKey && toKey)) {
    throw new Error(`missing key to delete`);
  }
  for (const lang of allLanguages) {
    console.log(lang);
    const langFile = `public/locales/${lang}.json`;
    if (!existsSync(langFile)) {
      continue;
    }
    const obj = readJSON(langFile);
    const val = getPath(obj, fromKey.split("."));
    setPath(obj, toKey.split("."), val);
    saveJSON(langFile, obj, { indent: 2 });
    // break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
