import * as React from "react";
import { useTranslation } from "react-i18next";
import { Generation, generations, isGeneration } from "./data-generations";
import { languages } from "./languages";
import { Select } from "./Select";
import { useLanguage } from "./useLanguage";

interface CommonSettingsProps {
  generation: Generation;
  setGeneration: (generation: Generation) => void;
}

export function CommonSettings({
  generation,
  setGeneration,
}: CommonSettingsProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useLanguage();
  return (
    <div className="grid grid-col2 gap3">
      <Select
        label={t("games.label")}
        value={generation}
        helpText={t("games.help")}
        onChange={(event) => {
          const { value } = event.target;
          if (isGeneration(value)) {
            setGeneration(value);
          } else {
            console.error("not a generation:", value);
          }
        }}
      >
        {generations.map((gen) => {
          return (
            <option key={gen} value={gen}>
              {t(`games.byID.${gen}`)}
            </option>
          );
        })}
      </Select>
      <Select
        label={t("more.settings.language.label")}
        value={language}
        helpText={t("more.settings.language.helpText")}
        onChange={(event) => {
          setLanguage(event.target.value);
          i18n.changeLanguage(language);
        }}
      >
        {languages.map((lang) => {
          return (
            <option key={lang.value} value={lang.value}>
              {lang.title}
            </option>
          );
        })}
      </Select>
    </div>
  );
}
