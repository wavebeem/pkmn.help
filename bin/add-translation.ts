import { readJSON, saveJSON } from "./util.js";
import { setPath } from "./lib/setPath.js";

async function main() {
  const [key, lang, val] = process.argv.slice(2);
  if (!(key && lang && val)) {
    throw new Error(`usage: KEY LANG VAL`);
  }
  const langFile = `public/locales/${lang}.json`;
  const obj = readJSON(langFile);
  const k = key.split(".");
  setPath(obj, k, val);
  saveJSON(langFile, obj, { indent: 2 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
