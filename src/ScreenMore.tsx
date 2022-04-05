import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Generation, generations, isGeneration } from "./data-generations";
import { languages } from "./languages";
import { Select } from "./Select";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useTypeCount } from "./useTypeCount";

async function unregisterServiceWorker() {
  try {
    for (const reg of await navigator.serviceWorker.getRegistrations()) {
      try {
        await reg.unregister();
      } catch (err) {
        console.warn("Failed to unregister service worker", err);
      }
    }
  } finally {
    location.reload();
  }
}

export interface Language {
  title: string;
  value: string;
}

const typeCountValues = ["2", "3"] as const;
const themeValues = ["auto", "light", "dark"] as const;

interface ScreenMoreProps {
  generation: Generation;
  setGeneration: (generation: Generation) => void;
}

export default function ScreenMore({
  generation,
  setGeneration,
}: ScreenMoreProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();

  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f4">{t("more.contact.heading")}</h2>
      <p>
        <Trans
          i18nKey="more.contact.intro"
          values={{}}
          components={{
            homepage: (
              <a
                href="https://www.wavebeem.com"
                className="br1 underline fg-link OutlineFocus"
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
                className="br1 underline fg-link OutlineFocus"
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
        <Select
          label={t("more.settings.theme.label")}
          value={theme}
          helpText={t("more.settings.theme.help")}
          onChange={(event) => {
            setTheme(event.target.value);
          }}
        >
          {themeValues.map((value) => {
            return (
              <option key={value} value={value}>
                {t(`more.settings.theme.values.${value}`)}
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
          {typeCountValues.map((value) => {
            return (
              <option key={value} value={value}>
                {t(`more.settings.typeCount.values.${value}`)}
              </option>
            );
          })}
        </Select>
      </div>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.help.heading")}</h2>
      <p>{t("more.help.serviceWorker.description")}</p>
      <div className="mv3">
        <Button onClick={unregisterServiceWorker}>
          {t("more.help.serviceWorker.button")}
        </Button>
      </div>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.privacy.heading")}</h2>
      <p>
        <Trans
          i18nKey="more.privacy.description"
          components={{
            plausible: (
              <a
                href="https://plausible.io/privacy"
                className="br1 underline fg-link OutlineFocus"
              />
            ),
          }}
        />
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.givingBack.heading")}</h2>
      <p>{t("more.givingBack.description")}</p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.thanks.heading")}</h2>
      <ul className="lh-copy mt1 ph3">
        <li>{t("more.thanks.credits.cozzzy")}</li>
        <li>{t("more.thanks.credits.luziferSenpai")}</li>
        <li>{t("more.thanks.credits.gabrieleGiugno")}</li>
        <li>{t("more.thanks.credits.minamorl")}</li>
        <li>{t("more.thanks.credits.jansjo")}</li>
        <li>{t("more.thanks.credits.other")}</li>
      </ul>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.openSource.heading")}</h2>
      <p>
        <Trans
          i18nKey="more.openSource.description"
          components={{
            github: (
              <a
                href="https://github.com/wavebeem/pkmn.help"
                className="br1 underline fg-link OutlineFocus"
              />
            ),
          }}
        />
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.legalInfo.heading")}</h2>
      <p>
        <Trans i18nKey="more.legalInfo.pokemon" values={{ year }} />
      </p>
      <p>{t("more.legalInfo.dontSueMe")}</p>
      <p>
        <Trans
          i18nKey="more.legalInfo.pokeAPI"
          components={{
            pokeapi: (
              <a
                className="br1 underline fg-link OutlineFocus"
                href="https://pokeapi.co/"
              />
            ),
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="more.legalInfo.wavebeem"
          values={{ year }}
          components={{
            wavebeem: (
              <a
                className="br1 underline fg-link OutlineFocus"
                href="https://www.wavebeem.com"
              />
            ),
          }}
        />
      </p>
    </main>
  );
}
