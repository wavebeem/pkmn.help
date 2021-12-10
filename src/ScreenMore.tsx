import * as React from "react";
import { Button } from "./Button";
import { Select } from "./Select";
import { useLanguage } from "./useLanguage";

const year = new Date().getFullYear();

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
  name: string;
  code: string;
}

const languages: Language[] = [
  { name: "English", code: "en" },
  { name: "Japanese", code: "ja" },
  { name: "Japanese (Hiragana/Katakana)", code: "ja-Hrkt" },
  { name: "Chinese (Simplified)", code: "zh-Hans" },
  { name: "Chinese (Traditional)", code: "zh-Hant" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Italian", code: "it" },
  { name: "Korean", code: "ko" },
  { name: "Spanish", code: "es" },
];

export default function ScreenMore(): JSX.Element {
  const [language, setLanguage] = useLanguage();
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f4">Contact Me</h2>
      <p>
        Questions, suggestions, or just want to say thank you? Email me at{" "}
        <a
          className="underline fg-link OutlineFocus"
          href="mailto:brian@wavebeem.com"
        >
          brian@wavebeem.com
        </a>
        . Source code is available on{" "}
        <a
          href="https://github.com/wavebeem/pkmn.help"
          className="underline fg-link OutlineFocus"
        >
          GitHub
        </a>
        .
      </p>
      <div role="presentation" className="mv2 bt border3" />
      <h2 className="lh-title f4">Settings</h2>
      <div className="grid gap3 pb2">
        <label className="db">
          <div className="pr2 pb1">Language</div>
          <Select
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
          >
            {languages.map((lang) => {
              return (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              );
            })}
          </Select>
        </label>
        <p className="ma0 nt3 pt1">
          Language support is incomplete. Only Pokémon names are translated.
        </p>
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
