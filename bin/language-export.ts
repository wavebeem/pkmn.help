import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { readJSON } from "./util";

function* walk({
  english,
  other,
  ancestors = [],
}: {
  english: Record<string, unknown>;
  other: Record<string, unknown>;
  ancestors?: string[];
}): Generator<string[]> {
  if (!(typeof english === "object" && english)) {
    return;
  }
  for (const key of Object.keys(english)) {
    const englishValue = english?.[key] ?? "";
    const otherValue = other?.[key] ?? "";
    if (typeof englishValue === "string") {
      yield [
        [...ancestors, key].join("."),
        englishValue,
        typeof otherValue === "string" ? otherValue : "",
      ];
    } else {
      yield* walk({
        english: englishValue as any,
        other: otherValue as any,
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
  const csvData = [["Key", "en", lang], ...walk({ english, other })];
  const csv = Papa.unparse(csvData, { header: true });
  fs.writeFileSync(path.resolve(__dirname, `../${lang}.csv`), csv, "utf-8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
