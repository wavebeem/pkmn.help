import Papa from "papaparse";
import { Plugin } from "vite";
import * as fs from "fs";
import * as path from "path";

function readJSON(filename: string): any {
  const text = fs.readFileSync(filename, "utf-8");
  return JSON.parse(text);
}

function getTranslationFilenames(): string[] {
  const base = "public/locales";
  return fs.readdirSync(base).map((f) => path.join(base, f));
}

function getLanguageFromFilename(filename: string): string {
  return path.basename(filename, ".json");
}

function* dottedPaths(data: any): Generator<string> {
  yield* dottedPathsHelper("", data);
}

function dottedPathsJoin(base: string, key: string): string {
  if (base) {
    return `${base}.${key}`;
  }
  return key;
}

function* dottedPathsHelper(base: string, data: any): Generator<string> {
  if (!data) {
    return;
  }
  if (Array.isArray(data)) {
    for (const [i, x] of data.entries()) {
      yield* dottedPathsHelper(dottedPathsJoin(base, String(i)), x);
    }
  }
  if (typeof data === "object") {
    for (const [k, v] of Object.entries(data)) {
      yield* dottedPathsHelper(dottedPathsJoin(base, k), v);
    }
  }
  if (typeof data === "string") {
    yield base;
  }
}

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

function saveMissingTranslationsFor(
  lang: string,
  trans: Record<string, any>,
): void {
  const english = trans.en;
  const other = trans[lang];
  const data = walk({ english, other });
  const headers = ["Key", "en", lang];
  const csvData = [headers, ...data];
  const csv = Papa.unparse(csvData, { header: true });
  const filename = `./public/translations/${lang}.csv`;
  fs.writeFileSync(filename, csv, "utf-8");
}

// Computes each language's translation completion percentage (exposed to the
// app as the __TRANSLATION_COMPLETION__ global) and regenerates
// public/translations/*.csv listing any strings missing from each non-English
// locale.
//
// Runs every time Vite starts, so we can't easily forget it.
export function translations(): Plugin {
  return {
    name: "translations",
    config() {
      const trans: Record<string, any> = {};
      const pathSets: Record<string, Set<string>> = {};
      const names = getTranslationFilenames();
      const langs = names.map(getLanguageFromFilename);
      for (const name of names) {
        const lang = getLanguageFromFilename(name);
        const json = readJSON(name);
        trans[lang] = json;
        pathSets[lang] = new Set(dottedPaths(json));
      }
      for (const lang of langs) {
        if (lang === "en") {
          continue;
        }
        for (const transPath of pathSets[lang]) {
          if (!pathSets.en.has(transPath)) {
            // eslint-disable-next-line no-console
            console.error(`${lang} has unused translation: ${transPath}`);
          }
        }
      }
      const completions: Record<string, number> = {};
      for (const lang of langs) {
        completions[lang] = pathSets[lang].size / pathSets.en.size;
        // manually round down for not-yet-complete translations
        if (
          pathSets[lang].size !== pathSets.en.size &&
          completions[lang] >= 1
        ) {
          // eslint-disable-next-line no-console
          console.error(
            lang,
            pathSets[lang].size,
            "vs",
            "en",
            pathSets.en.size,
          );
          completions[lang] = 0.99;
        }
      }
      for (const lang of langs) {
        saveMissingTranslationsFor(lang, trans);
      }
      return {
        define: {
          __TRANSLATION_COMPLETION__: completions,
        },
      };
    },
  };
}
