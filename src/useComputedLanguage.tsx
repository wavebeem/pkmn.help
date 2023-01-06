import { useTranslation } from "react-i18next";
import { useLanguage } from "./useLanguage";

export function useComputedLanguage(): string {
  const { i18n } = useTranslation();
  const [language] = useLanguage();
  return language || i18n.language;
}
