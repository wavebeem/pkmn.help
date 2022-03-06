import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "./Button";
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

interface Language {
  title: string;
  value: string;
}

const languages: Language[] = [
  { title: "English", value: "en" },
  { title: "Japanese", value: "ja" },
  { title: "Japanese (Hiragana/Katakana)", value: "ja-Hrkt" },
  { title: "Chinese (Simplified)", value: "zh-Hans" },
  { title: "Chinese (Traditional)", value: "zh-Hant" },
  { title: "French", value: "fr" },
  { title: "German", value: "de" },
  { title: "Italian", value: "it" },
  { title: "Korean", value: "ko" },
  { title: "Spanish", value: "es" },
];

type TypeCountValue = "2" | "3";

interface TypeCount {
  title: string;
  value: TypeCountValue;
}

const typeCounts: TypeCount[] = [
  { title: "Two types (2)", value: "2" },
  { title: "Three types (3)", value: "3" },
];

type ThemeValue = "auto" | "light" | "dark";

interface Theme {
  title: string;
  value: ThemeValue;
}

const themes: Theme[] = [
  { title: "System default", value: "auto" },
  { title: "Light", value: "light" },
  { title: "Dark", value: "dark" },
];

export default function ScreenMore(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

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
                className="underline fg-link OutlineFocus"
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
                className="underline fg-link OutlineFocus"
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
          {themes.map((theme) => {
            return (
              <option key={theme.value} value={theme.value}>
                {theme.title}
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
          {typeCounts.map((tc) => {
            return (
              <option key={tc.value} value={tc.value}>
                {tc.title}
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
      <h2 className="lh-title f4">Privacy</h2>
      <p>
        I will never runs ads or steal your personal data. I use{" "}
        <a
          href="https://plausible.io/privacy"
          className="underline fg-link OutlineFocus"
        >
          Plausible Analytics
        </a>
        , which is self-funded, independent, hosted in the EU, and doesn&apos;t
        store any cookies on your computer.
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">{t("more.givingBack.heading")}</h2>
      <p>{t("more.givingBack.description")}</p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">Special Thanks</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Jansjo (testing, research)</li>
        <li>Several anonymous Poké Fans</li>
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
                className="underline fg-link OutlineFocus"
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
                className="underline fg-link OutlineFocus"
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
                className="underline fg-link OutlineFocus"
                href="https://www.wavebeem.com"
              />
            ),
          }}
        />
      </p>
    </main>
  );
}
