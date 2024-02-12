export function detectLanguage(): Lang | undefined {
  const json = localStorage.getItem("language");
  const lang = json && JSON.parse(json);
  if (isLang(lang)) {
    return lang;
  }
  return getDesiredLanguage();
}

export function getDesiredLanguage(): Lang | undefined {
  for (const l of navigator.languages) {
    if (l === "zh-HK") return "zh-Hant";
    if (l === "zh-TW") return "zh-Hant";
    if (l === "zh-CN") return "zh-Hans";
    if (l === "zh-SG") return "zh-Hans";
    if (l === "zh") return "zh-Hans";
    if (l === "pt") return "pt-BR";
    if (l.startsWith("pt-")) return "pt-BR";
    const key = l.split("-")[0];
    if (isLang(key)) return key;
  }
}

export function isLang(lang: string): lang is Lang {
  return langSet.has(lang as any);
}

export type Lang = typeof supportedLanguages[number];

export const supportedLanguages = [
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
] as const;

const langSet = new Set(supportedLanguages);
