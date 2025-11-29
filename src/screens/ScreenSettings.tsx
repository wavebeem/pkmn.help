import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { RadioGroup } from "../components/RadioGroup";
import { Section } from "../components/Section";
import { Select } from "../components/Select";
import { useGeneration } from "../hooks/useGeneration";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";
import { generations, isGeneration } from "../misc/data-generations";
import { getDesiredLanguage, isLang } from "../misc/detectLanguage";
import {
  formatLanguageCompletion,
  officialLanguages,
  showLang,
  unofficialLanguages,
} from "../misc/lang";

export function ScreenSettings(): ReactNode {
  const { t, i18n } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const autoLang = getDesiredLanguage() || "en";

  return (
    <main className="content-narrow center">
      <Flex direction="column" padding="large">
        <Flex direction="column" gap="large">
          <Section
            heading={
              <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.settings.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <Select
                label={t("more.settings.language.label")}
                value={language}
                helpText={
                  <>
                    Please{" "}
                    <FancyLink to="/translation/">help me translate</FancyLink>{" "}
                    this site. <span aria-hidden="true">🌎</span>
                  </>
                }
                onChange={(event) => {
                  setLanguage(event.target.value);
                  i18n.changeLanguage(language);
                }}
              >
                <optgroup label={t("more.settings.language.default")}>
                  <option value="">
                    * {showLang(autoLang)} ({formatLanguageCompletion(autoLang)}
                    )
                  </option>
                </optgroup>
                <optgroup label={t("more.settings.language.official")}>
                  {officialLanguages.map((lang) => {
                    if (!isLang(lang)) {
                      throw new Error(`${lang} is not a valid language`);
                    }
                    return (
                      <option value={lang} key={lang}>
                        {showLang(lang)} ({formatLanguageCompletion(lang)})
                      </option>
                    );
                  })}
                </optgroup>
                <optgroup label={t("more.settings.language.unofficial")}>
                  {unofficialLanguages.map((lang) => {
                    if (!isLang(lang)) {
                      throw new Error(`${lang} is not a valid language`);
                    }
                    return (
                      <option value={lang} key={lang}>
                        {showLang(lang)} ({formatLanguageCompletion(lang)})
                      </option>
                    );
                  })}
                </optgroup>
              </Select>

              <RadioGroup
                label={t("more.settings.theme.label")}
                value={theme}
                helpText={t("more.settings.theme.help")}
                options={[
                  {
                    value: "auto",
                    label: t(`more.settings.theme.values.auto`),
                  },
                  {
                    value: "light",
                    label: t(`more.settings.theme.values.light`),
                  },
                  {
                    value: "dark",
                    label: t(`more.settings.theme.values.dark`),
                  },
                  {
                    value: "night",
                    label: t(`more.settings.theme.values.night`),
                  },
                ]}
                onChange={(option) => void setTheme(option.value)}
              />

              <RadioGroup
                label={t("games.label")}
                value={generation}
                helpText={t("games.help")}
                onChange={(option) => {
                  const { value } = option;
                  if (isGeneration(value)) {
                    setGeneration(value);
                  } else {
                    // eslint-disable-next-line no-console
                    console.error("not a generation:", value);
                  }
                }}
                options={generations.map((gen) => {
                  return {
                    value: gen,
                    label: t(`games.byID.${gen}`),
                  };
                })}
              />

              <RadioGroup
                label={t("more.settings.typeCount.label")}
                value={typeCount}
                helpText={t("more.settings.typeCount.help")}
                onChange={(option) => {
                  setTypeCount(option.value);
                }}
                options={[
                  {
                    value: "2",
                    label: t("more.settings.typeCount.values.2"),
                  },
                  {
                    value: "3",
                    label: t("more.settings.typeCount.values.3"),
                  },
                ]}
              />
            </Flex>
          </Section>
        </Flex>
      </Flex>
    </main>
  );
}
