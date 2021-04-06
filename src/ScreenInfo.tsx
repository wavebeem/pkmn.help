import * as React from "react";

const year = new Date().getFullYear();

export default function ScreenInfo() {
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">Contact Me</h2>
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
      <h2 className="lh-title f5">Privacy</h2>
      <p>
        I will never runs ads or steal your personal data. I use{" "}
        <a
          href="https://plausible.io/privacy"
          className="underline fg-link OutlineFocus"
        >
          Plausible Analytics
        </a>
        , which is self-funded, independent, hosted in the EU, and doesn't store
        any cookies on your computer.
      </p>
      <h2 className="lh-title f5">Giving Back</h2>
      <p>
        I have spent countless hours improving this site. If you appreciate what
        I've made, please consider donating to charities that support BIPOC and
        transgender rights.
      </p>
      <h2 className="lh-title f5">Special Thanks</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Jansjo (testing, research)</li>
        <li>Several anonymous Poké Fans</li>
      </ul>
      <h2 className="lh-title f5">Legal Info</h2>
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
        Pokédex data scraped from Bulbapedia's{" "}
        <a
          className="underline fg-link OutlineFocus"
          href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number"
        >
          National Pokédex
        </a>{" "}
        and{" "}
        <a
          className="underline fg-link OutlineFocus"
          href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VIII-present)"
        >
          List of Pokémon by base stats
        </a>{" "}
        pages.
      </p>
      <p>
        pkmn.help &copy; 2013&ndash;{year}{" "}
        <a
          href="https://www.mockbrian.com"
          className="underline fg-link OutlineFocus"
        >
          Brian Mock
        </a>
        .
      </p>
    </main>
  );
}

ScreenInfo.displayName = "ScreenInfo";
