import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const i18n = i18next
  .use(Backend)
  .use(initReactI18next)
  //  https://www.i18next.com/overview/configuration-options
  .init({
    lng: JSON.parse(localStorage.getItem("language") || JSON.stringify("en")),

    fallbackLng: {
      // Hong Kong and Taiwan use Traditional Chinese
      "zh-HK": ["zh-Hant"],
      "zh-TW": ["zh-Hant"],
      // China and Singapore use Simplified Chinese
      "zh-CN": ["zh-Hans"],
      "zh-SG": ["zh-Hans"],
      zh: ["zh-Hans"],
      // Portugal would probably like Brazilian Portuguese over English?
      pt: ["pt-BR"],
      "pt-PT": ["pt-BR"],
      default: ["en"],
    },

    debug: import.meta.env.DEV,

    interpolation: {
      // Not needed for React lol
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}-{{ns}}.json",
    },
  });
