/* global module */
module.exports = {
  output: "public/locales/$LOCALE-$NAMESPACE.json",
  input: "src/**/*.{ts,tsx}",
  createOldCatalogs: false,
  keepRemoved: true,
  locales: [
    "en",
    "ja",
    "ja-Hrkt",
    "zh-Hans",
    "zh-Hant",
    "fr",
    "de",
    "it",
    "ko",
    "es",
  ],
};
