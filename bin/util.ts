import fs from "fs";
import { isLang } from "../src/misc/detectLanguage.js";

export function saveJSON(
  filename: string,
  data: unknown,
  { indent = 0 }: { indent?: number } = {},
): void {
  fs.writeFileSync(
    filename,
    JSON.stringify(data, null, indent) + "\n",
    "utf-8",
  );
}

export function readJSON(filename: string): any {
  try {
    const json = fs.readFileSync(filename, "utf-8");
    return JSON.parse(json);
  } catch (_err) {
    return undefined;
  }
}
export function toObject<T, K extends string, V>({
  data,
  key,
  value,
}: {
  data: T[];
  key: (item: T) => K;
  value: (item: T) => V;
}): Record<K, V> {
  const obj = {} as Record<K, V>;
  for (const item of data) {
    obj[key(item)] = value(item);
  }
  return obj;
}

export function simplifyTranslations(
  list: { name: string; language: { name: string } }[],
): Record<string, string> {
  const ret: Record<string, string> = {};
  for (const t of list) {
    let lang = t.language.name;
    // PokeAPI seems to have changed their capitalization?
    // https://github.com/PokeAPI/pokeapi/issues/1548
    if (lang === "ja-hrkt") {
      lang = "ja-Hrkt";
    } else if (lang === "ja-roma") {
      continue;
    } else if (lang === "zh-hans") {
      lang = "zh-Hans";
    } else if (lang === "zh-hant") {
      lang = "zh-Hant";
    }
    // Skip languages we don't translate the site into (e.g. "es-419"),
    // rather than bloating the data with text we never display.
    if (!isLang(lang)) {
      continue;
    }
    ret[lang] = t.name;
  }
  // Backfill regular Japanese from Japanese (kana-only) if Japanese is missing.
  if ("ja-Hrkt" in ret && !("ja" in ret)) {
    ret.ja = ret["ja-Hrkt"];
    delete ret["ja-Hrkt"];
  }
  return ret;
}
