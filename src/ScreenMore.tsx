import classNames from "classnames";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "./Button";
import { CollapsibleSection } from "./CollapsibleSection";
import { Select } from "./Select";
import { TranslationCard } from "./TranslationCard";
import { compare } from "./compare";
import { generations, isGeneration } from "./data-generations";
import {
  getDesiredLanguage,
  isLang,
  supportedLanguages,
} from "./detectLanguage";
import { resetApp } from "./resetApp";
import { useGeneration } from "./useGeneration";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useTypeCount } from "./useTypeCount";
import {
  showLang,
  formatLanguageCompletion,
  officialLanguages,
  unofficialLanguages,
  languageBounty,
  languageCompletions,
} from "./lang";

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
        <div role="presentation" className="mv2 bt border3" />
        <div>
          <a
            href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md"
            className="br1 underline fg-link focus-outline"
          >
            {t("banners.updateReady.whatsNew")}
          </a>
        </div>
      </div>

      <h2 className={classH2}>{t("more.contact.heading")}</h2>

      <p>
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
      </p>

      <p>
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
      </p>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className={classH2}>{t("more.settings.heading")}</h2>

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
          <option value="light">{t("more.settings.theme.values.light")}</option>
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

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock} id="translate">
            <span aria-hidden="true">🌎</span> Help me translate
          </h2>
        }
      >
        <p>
          Download a translation file below to get started. You can edit CSV
          files with{" "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://docs.google.com/"
          >
            Google Docs
          </a>
          ,{" "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://www.libreoffice.org/download/download-libreoffice/"
          >
            LibreOffice Calc
          </a>
          ,{" "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://www.moderncsv.com/"
          >
            Modern CSV
          </a>
          , and many other apps.
        </p>
        <p>
          Send me the translated file via email when you&apos;e done (
          <a
            className="br1 underline fg-link focus-outline"
            href="mailto:pkmn@wavebeem.com"
          >
            pkmn
            <wbr />
            @wavebeem
            <wbr />
            .com
          </a>
          ). If you have questions, feel free to ask. Confused about CSV files?
          I can set up a Google Sheet for you.
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
        <div className="pt2" />
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.changes.heading")}</h2>
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

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.help.heading")}</h2>
        }
      >
        <div className="mv3">
          <Button onClick={resetApp}>
            {t("more.help.serviceWorker.button")}
          </Button>
        </div>

        <p>{t("more.help.serviceWorker.description")}</p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.privacy.heading")}</h2>
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

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.givingBack.heading")}</h2>
        }
      >
        <p>{t("more.givingBack.description")}</p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.thanks.heading")}</h2>
        }
      >
        <h3 className={classH3}>{t("more.thanks.sections.da")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Simon</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.ru")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Abylay Zhandarbek</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.kk")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Abylay Zhandarbek</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.pt-PT")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Bernardo Ferreira</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.pt-BR")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Vio</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.zh-Hans")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Dragonify</li>
          <li>Tin</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.zh-Hant")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Nan Zheng</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.ro")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Adam Hayes</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.pl")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Sebastian Biegaj</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.fr")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Kaishidow</li>
          <li>Drakoshen</li>
          <li>Azertor</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.de")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>SpeciesSaladMallory</li>
          <li>Cozzzy</li>
          <li>Luzifer Senpai</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.nl")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Julking</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.it")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Gabriele Giugno</li>
          <li>
            Fabio <q>N&trade;</q> Ilari
          </li>
          <li>Banshee</li>
          <li>Mathieu Licata</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.ko")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>BetterBritter</li>
          <li>Eric Marriott</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.ja")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Minamorl</li>
        </ul>

        <h3 className={classH3}>{t("more.thanks.sections.testing")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Jansjo</li>
          <li>Marten</li>
        </ul>

        <h3 className={classH3Last}>{t("more.thanks.sections.other")}</h3>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.openSource.heading")}</h2>
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

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className={classH2InlineBlock}>{t("more.legalInfo.heading")}</h2>
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
          <a
            className="br1 underline fg-link focus-outline"
            href="https://pokeapi.co/"
          >
            PokéAPI
          </a>
          {" & "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://pokemondb.net/"
          >
            Pokémon Database
          </a>
          .
        </p>

        <p>
          pkmn.help &copy; 2013&ndash;{year}{" "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://www.wavebeem.com"
          >
            Sage Fennel
          </a>
          .
        </p>
      </CollapsibleSection>
    </main>
  );
}
