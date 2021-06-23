export function pickTranslation(obj: Record<string, string>): string {
  // Browsers typically only include a region code after the language, but
  // PokéAPI tells us the script instead. Map the region codes to script codes
  // for Simplified vs Traditional Chinese
  const languages = navigator.languages
    .map((s) => s.toLowerCase())
    .map((s) => {
      if (s === "zh-tw" || s === "zh-hk" || s === "zh-mo") {
        return "zh-Hant";
      }
      if (s === "zh-cn" || s === "zh-sg") {
        return "zh-Hans";
      }
      // Remove the region code because we don't support it for other languages
      return s.split("-")[0];
    });
  for (const lang of languages) {
    if (lang in obj) {
      return obj[lang];
    }
  }
  return obj.en;
}
