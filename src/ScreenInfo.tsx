import * as React from "react";

const year = new Date().getFullYear();

export default function ScreenInfo() {
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">Source Code and Issues</h2>
      <p>
        Check out the{" "}
        <a
          href="https://github.com/wavebeem/pkmn.help"
          className="underline fg-link OutlineFocus"
        >
          pkmn.help
        </a>{" "}
        repository on GitHub. Issues and feature requests are best reported
        there. Otherwise you can email me{" "}
        <a
          className="underline fg-link OutlineFocus"
          href="mailto:brian@wavebeem.com"
        >
          brian@wavebeem.com
        </a>
        .
      </p>
      <h2 className="lh-title f5">Giving Back</h2>
      <p>
        I have spent countless hours polishing this site to perfection. I will
        never run ads or steal your personal data. If you appreciate what
        I&apos;ve made, please consider donating to support black lives and
        trans rights.
      </p>
      <h2 className="lh-title f5">Special Thanks</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Jansjo (testing, research)</li>
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
        Pokédex data scraped from Bulbapedia&apos;s{" "}
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
