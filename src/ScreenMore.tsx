import * as React from "react";
import { useTranslation } from "react-i18next";
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
  // const { t, ready } = useTranslation(undefined, { useSuspense: false });
  const { t, ready } = useTranslation();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();
  console.log({ ready }, t("hello"));
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f4">{t("contact-me")}</h2>
      <p>
        Hi, I&apos;m{" "}
        <a
          href="https://www.wavebeem.com"
          className="underline fg-link OutlineFocus"
        >
          Brian
        </a>{" "}
        (they/them), and I made Pokémon Type Calculator (pkmn.help).
      </p>
      <p>
        Please email your thoughts and thank-yous to{" "}
        <a
          className="underline fg-link OutlineFocus"
          href="mailto:pkmn@wavebeem.com"
        >
          pkmn@wavebeem.com
        </a>
        .
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">Settings</h2>
      <div className="grid gap3 pb2">
        <Select
          label="Language"
          value={language}
          helpText="Language support is incomplete. Only Pokémon names are translated."
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
          label="Theme"
          value={theme}
          helpText="&ldquo;System default&rdquo; will change automatically depending on your operating system settings."
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
          label="Number of types"
          value={typeCount}
          helpText="Pokémon can briefly have three types at once if hit with Forests's Curse or Trick-or-Treat. The third type field is hidden by default since it is rarely used."
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
      <h2 className="lh-title f4">Help</h2>
      <p>This button can help fix issues in the app.</p>
      <div className="mv3">
        <Button onClick={unregisterServiceWorker}>
          Unregister service worker
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
      <h2 className="lh-title f4">Giving Back</h2>
      <p>
        I have spent countless hours improving this site. If you appreciate what
        I&apos;ve made, please consider donating to charities that support BIPOC
        and transgender rights.
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">Special Thanks</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Jansjo (testing, research)</li>
        <li>Several anonymous Poké Fans</li>
      </ul>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">Open Source</h2>
      <p>
        Source code is available on{" "}
        <a
          href="https://github.com/wavebeem/pkmn.help"
          className="underline fg-link OutlineFocus"
        >
          GitHub
        </a>
        .
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">Legal Info</h2>
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
        Pokédex data from{" "}
        <a
          className="underline fg-link OutlineFocus"
          href="https://pokeapi.co/"
        >
          PokéAPI
        </a>
        .
      </p>
      <p>
        pkmn.help &copy; 2013&ndash;{year}{" "}
        <a
          href="https://www.wavebeem.com"
          className="underline fg-link OutlineFocus"
        >
          Brian Mock
        </a>
        .
      </p>
    </main>
  );
}
