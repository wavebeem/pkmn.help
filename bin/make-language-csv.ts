import Papa from "papaparse";
import path from "path";
import fs from "fs";
import { readJSON } from "./readJSON";

function walk({
  english,
  other,
  csvData,
  ancestors,
}: {
  english: Record<string, unknown>;
  other: Record<string, unknown>;
  csvData: string[][];
  ancestors: string[];
}): void {
  if (!(typeof english === "object" && english)) {
    return;
  }
  for (const key of Object.keys(english)) {
    const englishValue = english?.[key] ?? "";
    const otherValue = other?.[key] ?? "";
    if (typeof englishValue === "string") {
      csvData.push([
        [...ancestors, key].join("."),
        englishValue,
        typeof otherValue === "string" ? otherValue : "",
      ]);
    } else {
      walk({
        english: englishValue as any,
        other: otherValue as any,
        csvData,
        ancestors: [...ancestors, key],
      });
    }
  }
}

async function main() {
  const lang = process.argv[2];
  if (!lang) {
    throw new Error(`no such language ${lang}`);
  }
  const english = readJSON("../public/locales/en-translation.json");
  const other = readJSON(`../public/locales/${lang}-translation.json`) || {};
  const csvData = [["Key", "en", lang]];
  walk({ english, other, csvData, ancestors: [] });
  const csv = Papa.unparse(csvData, { header: true });
  fs.writeFileSync(path.resolve(__dirname, `../${lang}.csv`), csv, "utf-8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
