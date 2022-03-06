import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
// NOTE: Detect language automatically, could be useful later
// https://github.com/i18next/i18next-browser-languageDetector

export const i18n = i18next
  .use(Backend)
  .use(initReactI18next)
  //  https://www.i18next.com/overview/configuration-options
  .init({
    // lng: "cimode",
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: "/locales/{{lng}}-{{ns}}.json",
    },
  });
