import classNames from "classnames";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "./Button";
import { CollapsibleSection } from "./CollapsibleSection";
import { generations, isGeneration } from "./data-generations";
import { resetApp } from "./resetApp";
import { Select } from "./Select";
import { useGeneration } from "./useGeneration";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useTypeCount } from "./useTypeCount";
import {
  Lang,
  detectLanguage,
  getDesiredLanguage,
  isLang,
  supportedLanguages,
} from "./detectLanguage";

export interface ScreenMoreProps {
  needsAppUpdate: boolean;
  updateApp: () => Promise<void>;
}

const languageCompletions =
  typeof __TRANSLATION_COMPLETION__ === "undefined"
    ? {}
    : __TRANSLATION_COMPLETION__;

const ndash = "\u2013";

const languageNamesNative: Record<Lang, string> = {
  en: `English`,
  es: `Español`,
  "pt-BR": `Português Brasileiro`,
  de: `Deutsch`,
  da: `Dansk`,
  it: `Italiano`,
  fr: `Français`,
  ro: `Română`,
  pl: `Polski`,
  ru: `Русский`,
  kk: `Қазақша`,
  ja: `日本語`,
  "ja-Hrkt": `にほんご`,
  "zh-Hans": `简体中文`,
  "zh-Hant": `繁體中文`,
  ko: `한국어`,
};

const languageNamesEnglish: Record<Lang, string> = {
  en: "",
  es: `Spanish`,
  "pt-BR": `Brazilian Portuguese`,
  de: `German`,
  da: `Danish`,
  it: `Italian`,
  fr: `French`,
  ro: `Romanian`,
  pl: `Polish`,
  ru: `Russian`,
  kk: `Kazakh`,
  ja: `Japanese`,
  "ja-Hrkt": `Japanese Kana-only`,
  "zh-Hans": `Simplified Chinese`,
  "zh-Hant": `Traditional Chinese`,
  ko: `Korean`,
};

function formatLanguageCompletion(lang: string): string {
  const value = languageCompletions[lang] || 0;
  const n = (value * 100).toFixed(1);
  return `${n}%`;
}

function showLang(lang: Lang): string {
  return [languageNamesNative[lang], languageNamesEnglish[lang]]
    .filter((x) => x)
    .join(` ${ndash} `);
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

  return (
    <main className="pa3 center content-narrow lh-copy">
      <div
        hidden={!needsAppUpdate}
        className={classNames([
          "button-shadow",
          "bg1 fg1",
          "border2 ba br2",
          "pa3",
          "center",
          "flex flex-column gap1",
        ])}
      >
        <div className="flex gap1">
          <span className="flex flex-auto items-center">
            {t("banners.updateReady.description")}
          </span>
          <Button
            className="ml3"
            size="small"
            type="button"
            onClick={updateApp}
          >
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

      <h2 className="lh-title f4">{t("more.contact.heading")}</h2>

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

      <h2 className="lh-title f4">{t("more.settings.heading")}</h2>

      <div className="grid gap3 pb2">
        <Select
          label={t("more.settings.language.label")}
          value={language}
          helpText="Please help me translate this site. Read the next section to help."
          onChange={(event) => {
            setLanguage(event.target.value);
            i18n.changeLanguage(language);
          }}
        >
          <option value="">
            {t("more.settings.language.default")} &ndash; {showLang(autoLang)}{" "}
            &ndash; {formatLanguageCompletion(autoLang)}
          </option>
          <option disabled>&ndash;</option>
          {Object.keys(languageNamesNative).map((lang) => {
            if (!isLang(lang)) {
              throw new Error(`${lang} is not a valid language`);
            }
            return (
              <option value={lang} key={lang}>
                {showLang(lang)} &ndash; {formatLanguageCompletion(lang)}
              </option>
            );
          })}
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
          <h2 className="lh-title f4 dib">
            Help me translate this site <span aria-hidden="true">🌎</span>
          </h2>
        }
      >
        <p>
          Please help me translate Pokémon Type Calculator. Email me (
          <a
            className="br1 underline fg-link focus-outline"
            href="mailto:pkmn@wavebeem.com"
          >
            pkmn@wavebeem.com
          </a>
          ) and I will send you a Google Sheet to translate. I'm willing to pay
          for native translations.
        </p>

        <p>
          This table shows translation progress for every supported language.
        </p>

        <div className="ba border2 mb3 br2 bg1 pa2 button-shadow">
          <table className="collapse w-100">
            <thead>
              <tr>
                <th className="ph2 pv1 bb border3 tr w0">Completion</th>
                <th className="ph2 pv1 bb border3 tl">Language</th>
              </tr>
            </thead>
            <tbody>
              {supportedLanguages.map((lang) => {
                return (
                  <tr key={lang}>
                    <td className="tabular-nums tr ph2 pv1 bt border3">
                      {formatLanguageCompletion(lang)}
                    </td>
                    <td className="ph2 pv1 tl bt border3">{showLang(lang)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.changes.heading")}</h2>
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
        heading={<h2 className="lh-title f4 dib">{t("more.help.heading")}</h2>}
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
          <h2 className="lh-title f4 dib">{t("more.privacy.heading")}</h2>
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
          <h2 className="lh-title f4 dib">{t("more.givingBack.heading")}</h2>
        }
      >
        <p>{t("more.givingBack.description")}</p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.thanks.heading")}</h2>
        }
      >
        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.da")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Simon</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ru")}</h3>
        <h3 className="lh-title f5 mt1 mb0">{t("more.thanks.sections.kk")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Abylay Zhandarbek</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.pt-BR")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Vio</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.zh-Hans")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Dragonify</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ro")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Adam Hayes</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.pl")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Sebastian Biegaj</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.fr")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Kaishidow</li>
          <li>Drakoshen</li>
          <li>Azertor</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.de")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Cozzzy</li>
          <li>Luzifer Senpai</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.it")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Gabriele Giugno</li>
          <li>Fabio “N™” Ilari</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ko")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Eric Marriott</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ja")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Minamorl</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.testing")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Jansjo</li>
          <li>Marten</li>
        </ul>

        <h3 className="lh-title f5">{t("more.thanks.sections.other")}</h3>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.openSource.heading")}</h2>
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
          <h2 className="lh-title f4 dib">{t("more.legalInfo.heading")}</h2>
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
