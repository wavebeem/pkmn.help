export function detectLanguage(): Lang | undefined {
  const json = localStorage.getItem("language");
  const lang = json && JSON.parse(json);
  if (isLang(lang)) {
    return lang;
  }
  return getDesiredLanguage();
}

export function getDesiredLanguage(): Lang | undefined {
  for (const code of navigator.languages) {
    // If it's a language we support, use it as-is
    if (isLang(code)) return code;
    // Normalize country-centric language codes to the more generic
    // script-centric ones for Chinese languages
    if (code === "zh-HK") return "zh-Hant";
    if (code === "zh-TW") return "zh-Hant";
    if (code === "zh-CN") return "zh-Hans";
    if (code === "zh-SG") return "zh-Hans";
    // Otherwise just use the language code without the country code
    const [lang] = code.split("-");
    // Give preference to simplified Chinese for any other language code that
    // wants a Chinese language... Not sure if that's really the best idea, but
    // I have to pick something here...
    if (code === "zh") return "zh-Hans";
    // Any Portuguese langauge besides Brazilian Portuguese should use European
    // Portuguese translation
    if (code === "pt") return "pt-PT";
    // If the language code minus the country code is a language we support
    if (isLang(lang)) return lang;
  }
  return undefined;
}

export function isLang(lang: string): lang is Lang {
  return langSet.has(lang as any);
}

export type Lang = typeof supportedLanguages[number];

export const supportedLanguages = [
  "en",
  "es",
  "pt-PT",
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
