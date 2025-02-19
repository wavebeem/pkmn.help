import { readJSON, saveJSON } from "./util.js";
import { allLanguages } from "../src/misc/lang.js";
import { existsSync } from "node:fs";
import { deletePath } from "./lib/deletePath.js";

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
