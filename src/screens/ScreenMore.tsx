import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Select } from "../components/Select";
import { TranslationCard } from "../components/TranslationCard";
import { compare } from "../misc/compare";
import { generations, isGeneration } from "../misc/data-generations";
import {
  getDesiredLanguage,
  isLang,
  supportedLanguages,
} from "../misc/detectLanguage";
import { resetApp } from "../misc/resetApp";
import { useGeneration } from "../hooks/useGeneration";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";
import {
  showLang,
  formatLanguageCompletion,
  officialLanguages,
  unofficialLanguages,
  languageBounty,
  languageCompletions,
} from "../misc/lang";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Divider } from "../components/Divider";
import { ExternalLink } from "../components/ExternalLink";

interface ScreenMoreProps {
  needsAppUpdate: boolean;
  updateApp: () => Promise<void>;
}

export function ScreenMore({
  needsAppUpdate,
  updateApp,
}: ScreenMoreProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();
  const autoLang = getDesiredLanguage() || "en";

  const classH3Last = "normal weight-medium lh-title mv3 f4";
  const classH3 = classNames(classH3Last, "mb0");
  const classH2 = "lh-title f3 mv3 weight-medium";
  const classH2InlineBlock = classNames(classH2, "dib");

  return (
    <main className="pa3 center content-narrow">
      <Flex direction="column" gap="large">
        <div
          className={classNames([
            "button-shadow",
            "bg1 fg1",
            "border2 ba br2",
            "pa3",
            "center",
            "flex-column gap1",
            needsAppUpdate && "flex",
            !needsAppUpdate && "dn",
          ])}
        >
          <div className="flex gap1">
            <span className="flex flex-auto items-center">
              {t("banners.updateReady.description")}
            </span>
            <Button className="ml3" type="button" onClick={updateApp}>
              {t("banners.updateReady.update")}
            </Button>
          </div>
          <Divider />
          <div>
            <a
              href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md"
              className="br1 underline fg-link focus-outline"
            >
              {t("banners.updateReady.whatsNew")}
            </a>
          </div>
        </div>

        <Flex direction="column" gap="large">
          <FancyText tag="h2" fontWeight="medium">
            {t("more.contact.heading")}
          </FancyText>

          <FancyText tag="p">
            <Trans
              i18nKey="more.contact.intro"
              values={{}}
              components={{
                homepage: (
                  <a
                    href="https://www.wavebeem.com"
                    className="br1 underline fg-link focus-outline"
                  />
                ),
              }}
            />
          </FancyText>

          <FancyText tag="p">
            <Trans
              i18nKey="more.contact.email"
              components={{
                email: (
                  <a
                    className="br1 underline fg-link focus-outline"
                    href="mailto:pkmn@wavebeem.com"
                  />
                ),
              }}
            />
          </FancyText>
        </Flex>

        <Divider />

        <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
          {t("more.settings.heading")}
        </FancyText>

        <div className="grid gap3 pb2">
          <Select
            label={t("more.settings.language.label")}
            value={language}
            helpText={
              <>
                <span aria-hidden="true">🌎</span> Please{" "}
                <a
                  className="br1 underline fg-link focus-outline"
                  href="#translate"
                  onClick={(event) => {
                    const element = event.target as HTMLAnchorElement;
                    const href = element.getAttribute("href") || "";
                    const section = document
                      .querySelector(href)
                      ?.closest("details");
                    if (!section) {
                      throw new Error("couldn't find " + href);
                    }
                    section.open = true;
                  }}
                >
                  help me translate
                </a>{" "}
                this site.
              </>
            }
            onChange={(event) => {
              setLanguage(event.target.value);
              i18n.changeLanguage(language);
            }}
          >
            <optgroup label={t("more.settings.language.default")}>
              <option value="">
                * {showLang(autoLang)} ({formatLanguageCompletion(autoLang)})
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
            label={t("more.settings.theme.label")}
            value={theme}
            helpText={t("more.settings.theme.help")}
            onChange={(event) => {
              setTheme(event.target.value);
            }}
          >
            <option value="auto">{t("more.settings.theme.values.auto")}</option>
            <option value="light">
              {t("more.settings.theme.values.light")}
            </option>
            <option value="dark">{t("more.settings.theme.values.dark")}</option>
          </Select>

          <Select
            label={t("games.label")}
            value={generation}
            helpText={t("games.help")}
            onChange={(event) => {
              const { value } = event.target;
              if (isGeneration(value)) {
                setGeneration(value);
              } else {
                // eslint-disable-next-line no-console
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
            label={t("more.settings.typeCount.label")}
            value={typeCount}
            helpText={t("more.settings.typeCount.help")}
            onChange={(event) => {
              setTypeCount(event.target.value);
            }}
          >
            <option value="2">{t("more.settings.typeCount.values.2")}</option>
            <option value="3">{t("more.settings.typeCount.values.3")}</option>
          </Select>
        </div>

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
              <span aria-hidden="true">🌎</span> Help me translate
            </FancyText>
          }
        >
          <p>
            Download a translation file below to get started. You can edit CSV
            files with{" "}
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
          </p>
          <p>
            Send me the translated file via email when you&apos;e done (
            <ExternalLink href="mailto:pkmn@wavebeem.com">
              pkmn
              <wbr />
              @wavebeem
              <wbr />
              .com
            </ExternalLink>
            ). If you have questions, feel free to ask. Confused about CSV
            files? I can set up a Google Sheet for you.
          </p>
          <p>I&apos;m offering payment for translation in some languages.</p>
          <div className="flex flex-column gap3">
            {supportedLanguages
              .slice(0)
              .filter((lang) => !(lang === "en" || lang === "ja-Hrkt"))
              .sort((a, b) => {
                return (
                  compare(languageBounty[b], languageBounty[a]) ||
                  compare(
                    languageCompletions[a] || 0,
                    languageCompletions[b] || 0
                  ) ||
                  compare(a, b)
                );
              })
              .map((lang) => {
                return <TranslationCard key={lang} lang={lang} />;
              })}
          </div>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.changes.heading")}
            </FancyText>
          }
        >
          <p>
            <Trans
              i18nKey="more.changes.description"
              components={{
                changelog: (
                  <a
                    href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md"
                    className="br1 underline fg-link focus-outline"
                  />
                ),
              }}
            />
          </p>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.help.heading")}
            </FancyText>
          }
        >
          <div className="mv3">
            <Button onClick={resetApp}>
              {t("more.help.serviceWorker.button")}
            </Button>
          </div>

          <p>{t("more.help.serviceWorker.description")}</p>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.privacy.heading")}
            </FancyText>
          }
        >
          <p>
            <Trans
              i18nKey="more.privacy.description"
              components={{
                plausible: (
                  <a
                    href="https://plausible.io/pkmn.help"
                    className="br1 underline fg-link focus-outline"
                  />
                ),
              }}
            />
          </p>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.givingBack.heading")}
            </FancyText>
          }
        >
          <p>{t("more.givingBack.description")}</p>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.thanks.heading")}
            </FancyText>
          }
        >
          <Flex direction="column" gap="large">
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.da")}
              </FancyText>
              <ul className="list-simple">
                <li>Simon</li>
              </ul>
            </Flex>

            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.ru")}
              </FancyText>
              <ul className="list-simple">
                <li>Abylay Zhandarbek</li>
              </ul>
            </Flex>

            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.kk")}
              </FancyText>
              <ul className="list-simple">
                <li>Abylay Zhandarbek</li>
              </ul>
            </Flex>

            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.pt-PT")}
              </FancyText>
              <ul className="list-simple">
                <li>Bernardo Ferreira</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.pt-BR")}
              </FancyText>
              <ul className="list-simple">
                <li>Vio</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.zh-Hans")}
              </FancyText>
              <ul className="list-simple">
                <li>Dragonify</li>
                <li>Tin</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.zh-Hant")}
              </FancyText>
              <ul className="list-simple">
                <li>Nan Zheng</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.ro")}
              </FancyText>
              <ul className="list-simple">
                <li>Adam Hayes</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.pl")}
              </FancyText>
              <ul className="list-simple">
                <li>Sebastian Biegaj</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.fr")}
              </FancyText>
              <ul className="list-simple">
                <li>Kaishidow</li>
                <li>Drakoshen</li>
                <li>Azertor</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.de")}
              </FancyText>
              <ul className="list-simple">
                <li>SpeciesSaladMallory</li>
                <li>Cozzzy</li>
                <li>Luzifer Senpai</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.nl")}
              </FancyText>
              <ul className="list-simple">
                <li>Julking</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.it")}
              </FancyText>
              <ul className="list-simple">
                <li>Gabriele Giugno</li>
                <li>
                  Fabio <q>N&trade;</q> Ilari
                </li>
                <li>Banshee</li>
                <li>Mathieu Licata</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.ko")}
              </FancyText>
              <ul className="list-simple">
                <li>BetterBritter</li>
                <li>Eric Marriott</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.ja")}
              </FancyText>
              <ul className="list-simple">
                <li>Minamorl</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="large">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.testing")}
              </FancyText>
              <ul className="list-simple">
                <li>Jansjo</li>
                <li>Marten</li>
              </ul>
            </Flex>
            <Flex direction="column" gap="medium">
              <FancyText tag="h3" fontSize="large">
                {t("more.thanks.sections.other")}
              </FancyText>
              <div />
            </Flex>
          </Flex>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.openSource.heading")}
            </FancyText>
          }
        >
          <p>
            <Trans
              i18nKey="more.openSource.description"
              components={{
                github: (
                  <a
                    href="https://github.com/wavebeem/pkmn.help"
                    className="br1 underline fg-link focus-outline"
                  />
                ),
              }}
            />
          </p>
        </CollapsibleSection>

        <Divider />

        <CollapsibleSection
          heading={
            <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
              {t("more.legalInfo.heading")}
            </FancyText>
          }
        >
          <p>
            Pokémon &copy; 2002&ndash;{year} Pokémon. &copy; 1995&ndash;{year}{" "}
            Nintendo/Creatures Inc./GAME FREAK inc. &trade;, &reg; and Pokémon
            character names are trademarks of Nintendo.
          </p>

          <p>
            No copyright or trademark infringement is intended in using Pokémon
            content on this page.
          </p>

          <p>
            Pokédex data is from {}
            <ExternalLink href="https://pokeapi.co/">PokéAPI</ExternalLink>.
          </p>

          <p>
            pkmn.help &copy; 2013&ndash;{year} {}
            <ExternalLink href="https://www.wavebeem.com">
              Sage Fennel
            </ExternalLink>
            .
          </p>
        </CollapsibleSection>
      </Flex>
    </main>
  );
}
