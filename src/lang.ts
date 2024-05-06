import { Lang } from "./detectLanguage";

export const languageCompletions =
  typeof __TRANSLATION_COMPLETION__ === "undefined"
    ? {}
    : __TRANSLATION_COMPLETION__;

export const languageNamesNative: Record<Lang, string> = {
  en: `English`,
  es: `Español`,
  "pt-PT": `Português (Portugal)`,
  "pt-BR": `Português (Brasil)`,
  de: `Deutsch`,
  da: `Dansk`,
  it: `Italiano`,
  fr: `Français`,
  ro: `Română`,
  pl: `Polski`,
  ru: `Русский`,
  nl: `Nederlands`,
  kk: `Қазақша`,
  ja: `日本語`,
  "ja-Hrkt": `にほんご`,
  "zh-Hans": `简体中文`,
  "zh-Hant": `繁體中文`,
  ko: `한국어`,
};

export const officialLanguages = [
  "en",
  "es",
  "de",
  "it",
  "fr",
  "ja",
  "zh-Hans",
  "zh-Hant",
  "ko",
] as const;

export const officialLanguagesSet = new Set(officialLanguages);

export const unofficialLanguages = Object.keys(languageNamesNative).filter(
  (lang) => {
    return !officialLanguagesSet.has(lang as any);
  }
);

export const languageNamesEnglish: Record<Lang, string> = {
  en: ``,
  es: `Spanish`,
  "pt-PT": "Portuguese (Portugal)",
  "pt-BR": `Portuguese (Brazil)`,
  de: `German`,
  da: `Danish`,
  it: `Italian`,
  fr: `French`,
  ro: `Romanian`,
  pl: `Polish`,
  ru: `Russian`,
  nl: `Dutch`,
  kk: `Kazakh`,
  ja: `Japanese`,
  "ja-Hrkt": `Japanese Kana-only`,
  "zh-Hans": `Simplified Chinese`,
  "zh-Hant": `Traditional Chinese`,
  ko: `Korean`,
};

export const languageBounty: Record<Lang, number> = {
  en: 0,
  es: 0,
  "pt-PT": 0,
  "pt-BR": 0,
  de: 0,
  da: 0,
  it: 0,
  fr: 0,
  ro: 0,
  pl: 0,
  ru: 0,
  nl: 0,
  kk: 0,
  ja: 50,
  "ja-Hrkt": 0,
  "zh-Hans": 0,
  "zh-Hant": 0,
  ko: 0,
};

export function formatLanguageCompletion(lang: string): string {
  const value = languageCompletions[lang] || 0;
  const n = Math.floor(value * 100);
  return `${n}%`;
}

export function showLang(lang: Lang): string {
  return languageNamesNative[lang];
}
