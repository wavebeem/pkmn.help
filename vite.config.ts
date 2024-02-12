import Papa from "papaparse";
import purgecss from "@fullhuman/postcss-purgecss";
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import * as fs from "fs";
import * as path from "path";

function readJSON(filename: string): any {
  const text = fs.readFileSync(filename, "utf-8");
  const json = JSON.parse(text);
  return json;
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

function dottedPathsJoin(base: string, path: string): string {
  if (base) {
    return `${base}.${path}`;
  }
  return path;
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

const officialOnlyKeys = new Set([
  "defense.abilityNames.wonder_guard",
  "defense.abilityNames.delta_stream",
  "defense.abilityNames.fluffy",
  "defense.abilityNames.purifying_salt",
  "defense.abilityNames.heatproof",
  "defense.abilityNames.water_bubble",
  "defense.abilityNames.thick_fat",
  "defense.abilityNames.earth_eater",
  "defense.abilityNames.levitate",
  "defense.abilityNames.flash_fire",
  "defense.abilityNames.well_baked_body",
  "defense.abilityNames.dry_skin",
  "defense.abilityNames.storm_drain",
  "defense.abilityNames.water_absorb",
  "defense.abilityNames.sap_sipper",
  "defense.abilityNames.lightning_rod",
  "defense.abilityNames.motor_drive",
  "defense.abilityNames.volt_absorb",
]);

const allLanguages = new Set([
  "en",
  "es",
  "pt-BR",
  "da",
  "de",
  "it",
  "fr",
  "pl",
  "ru",
  "nl",
  "kk",
  "ro",
  "ja",
  "ja-Hrkt",
  "zh-Hans",
  "zh-Hant",
  "ko",
]);

const officialLanguages = new Set([
  "en",
  "es",
  "de",
  "it",
  "fr",
  "ja",
  "zh-Hans",
  "zh-Hant",
  "ko",
]);

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
// eslint-disable-next-line no-console
console.info("Translations");
// eslint-disable-next-line no-console
console.info("------------");
for (const lang of langs) {
  // eslint-disable-next-line no-console
  console.info(`${pathSets[lang].size} | ${lang}`);
  if (officialLanguages.has(lang)) {
    completions[lang] = pathSets[lang].size / pathSets.en.size;
  } else {
    completions[lang] =
      pathSets[lang].size / (pathSets.en.size - officialOnlyKeys.size);
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

function saveMissingTranslationsFor(lang: string) {
  const english = trans.en;
  const other = trans[lang];
  const data = walk({ english, other });
  const headers = ["Key", "en", lang];
  const csvData = [headers, ...data].filter(([key]) => {
    if (officialOnlyKeys.has(key)) {
      return false;
    }
    return true;
  });
  const csv = Papa.unparse(csvData, { header: true });
  const filename = path.resolve(__dirname, `./public/translations/${lang}.csv`);
  fs.writeFileSync(filename, csv, "utf-8");
}

for (const lang of allLanguages) {
  saveMissingTranslationsFor(lang);
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const config: UserConfigExport = {
    define: {
      __TRANSLATION_COMPLETION__: completions,
    },
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      VitePWA({
        mode: env.mode !== "development" ? "production" : "development",
        includeAssets: ["data-pkmn.json", "locales/*.json"],
      }),
    ],
  };
  if (env.mode !== "development") {
    config.css = {
      postcss: {
        plugins: [
          purgecss({
            content: ["./index.html", "./src/**/*.{ts,tsx,js,html}"],
          }),
        ],
      },
    };
  }
  return config;
});
