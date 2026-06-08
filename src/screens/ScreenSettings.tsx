import { Fragment, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { RadioGroup } from "../components/RadioGroup";
import { Section } from "../components/Section";
import { Select } from "../components/Select";
import { useVersionGroup } from "../hooks/useVersionGroup";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";
import { getDesiredLanguage, isLang } from "../misc/detectLanguage";
import {
  formatLanguageCompletion,
  officialLanguages,
  showLang,
  unofficialLanguages,
} from "../misc/lang";
import { useBattleVariant } from "../hooks/useBattleVariant";
import versionsData from "../../data/versions.json" with { type: "json" };
import { pickTranslation } from "../misc/pickTranslation";
import { SelectDivider } from "../components/SelectDivider";
import { getVersionGroupName } from "../misc/versionGroup";

export function ScreenSettings(): ReactNode {
  const { t, i18n } = useTranslation();
  const [versionGroup, setVersionGroup] = useVersionGroup();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const [battleVariant, setBattleVariant] = useBattleVariant();
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

              <Select
                label={t("more.settings.versionGroup.label")}
                value={versionGroup}
                helpText={<>{t("more.settings.versionGroup.help")}</>}
                onChange={(event) => {
                  setVersionGroup(event.target.value);
                }}
              >
                <option value="">
                  {t("more.settings.versionGroup.values.all")}
                </option>
                {Object.entries(versionsData.generationsToVersionGroups)
                  .toReversed()
                  .map(([gen, vgs]) => {
                    // TODO: Use language specific rules to join version strings
                    const groupLabel = pickTranslation(
                      (versionsData.generationNames as any)[gen],
                      language,
                    );
                    return (
                      <Fragment key={gen}>
                        <SelectDivider />
                        <optgroup label={groupLabel}>
                          {vgs.toReversed().map((vg) => {
                            const vgn = getVersionGroupName({
                              versionGroup: vg,
                              language,
                              t,
                            });
                            return (
                              <option key={vg} value={vg}>
                                {vgn}
                              </option>
                            );
                          })}
                        </optgroup>
                      </Fragment>
                    );
                  })}
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

              <RadioGroup
                label={t("more.settings.battleVariant.label")}
                value={battleVariant}
                helpText={t("more.settings.battleVariant.help")}
                onChange={(option) => {
                  setBattleVariant(option.value);
                }}
                options={[
                  {
                    value: "regular",
                    label: t("more.settings.battleVariant.values.regular"),
                  },
                  {
                    value: "inverse_battle",
                    label: t(
                      "more.settings.battleVariant.values.inverse_battle",
                    ),
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
