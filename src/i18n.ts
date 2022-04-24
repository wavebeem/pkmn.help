import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { detectLanguage } from "./detectLanguage";

export const i18n = i18next
  .use(Backend)
  .use(initReactI18next)
  //  https://www.i18next.com/overview/configuration-options
  .init({
    lng: detectLanguage(),
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    interpolation: {
      // Not needed for React lol
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}-{{ns}}.json",
    },
  });
