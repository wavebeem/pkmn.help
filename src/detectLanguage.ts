export function detectLanguage() {
  const json = localStorage.getItem("language");
  const lang = json && JSON.parse(json);
  if (lang) {
    return lang;
  }
  for (const l of navigator.languages) {
    if (l === "zh-HK") return "zh-Hant";
    if (l === "zh-TW") return "zh-Hant";
    if (l === "zh-CN") return "zh-Hans";
    if (l === "zh-SG") return "zh-Hans";
    if (l === "zh") return "zh-Hans";
    if (l === "pt") return "pt-BR";
    if (l.startsWith("pt-")) return "pt-BR";
    const key = l.split("-")[0];
    if (langs.has(key)) return key;
  }
  return undefined;
}
const langs = new Set([
  "en",
  "es",
  "pt-BR",
  "de",
  "it",
  "fr",
  "ro",
  "ja",
  "ja-Hrkt",
  "zh-Hans",
  "zh-Hant",
  "ko",
]);
