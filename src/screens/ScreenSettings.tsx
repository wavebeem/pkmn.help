import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/Card";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Divider } from "../components/Divider";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { RadioGroup } from "../components/RadioGroup";
import { Select } from "../components/Select";
import { TranslationCard } from "../components/TranslationCard";
import { useGeneration } from "../hooks/useGeneration";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";
import { compare } from "../misc/compare";
import { generations, isGeneration } from "../misc/data-generations";
import {
  getDesiredLanguage,
  isLang,
  supportedLanguages,
} from "../misc/detectLanguage";
import { fail } from "../misc/fail";
import {
  formatLanguageCompletion,
  languageBounty,
  languageCompletions,
  officialLanguages,
  officialLanguagesSet,
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
        <Flex direction="column">
          <CollapsibleSection
            initiallyOpen
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
                    <ExternalLink
                      href="#translate"
                      onClick={(event) => {
                        const element = event.target as HTMLAnchorElement;
                        const url = new URL(element.href);
                        const section =
                          document
                            .querySelector(url.hash)
                            ?.closest("details") ??
                          fail("couldn't find " + url.hash);
                        section.open = true;
                      }}
                    >
                      help me translate
                    </ExternalLink>{" "}
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
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            heading={
              <FancyText
                inline
                tag="h2"
                fontSize="xlarge"
                fontWeight="medium"
                id="translate"
              >
                Help me translate <span aria-hidden="true">🌎</span>
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <FancyText tag="p">
                Download a translation file below to get started. You can edit
                CSV files with{" "}
                <ExternalLink href="https://docs.google.com/">
                  Google Docs
                </ExternalLink>
                ,{" "}
                <ExternalLink href="https://www.libreoffice.org/download/download-libreoffice/">
                  LibreOffice Calc
                </ExternalLink>
                ,{" "}
                <ExternalLink href="https://www.moderncsv.com/">
                  Modern CSV
                </ExternalLink>
                , and many other apps.
              </FancyText>
              <FancyText tag="p">
                Send me the translated file via email when you&apos;re done (
                <ExternalLink href="mailto:pkmn@wavebeem.com">
                  pkmn
                  <wbr />
                  @wavebeem
                  <wbr />
                  .com
                </ExternalLink>
                ). If you have questions, feel free to ask. Confused about CSV
                files? I can set up a Google Sheet for you.
              </FancyText>
              <FancyText tag="p">
                * = Not an official language for Pokémon games
              </FancyText>
              <Card>
                <Flex direction="column">
                  {supportedLanguages
                    .slice(0)
                    .filter((lang) => !(lang === "en" || lang === "ja-Hrkt"))
                    .sort((a, b) => {
                      return (
                        compare(languageBounty[b], languageBounty[a]) ||
                        compare(
                          officialLanguagesSet.has(a) ? 0 : 1,
                          officialLanguagesSet.has(b) ? 0 : 1,
                        ) ||
                        compare(
                          languageCompletions[a] || 0,
                          languageCompletions[b] || 0,
                        ) ||
                        compare(a, b)
                      );
                    })
                    .map((lang, i) => {
                      return (
                        <>
                          {i > 0 && <Divider />}
                          <TranslationCard key={lang} lang={lang} />
                        </>
                      );
                    })}
                </Flex>
              </Card>
            </Flex>
          </CollapsibleSection>
        </Flex>
      </Flex>
    </main>
  );
}
