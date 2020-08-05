import * as React from "react";

const year = new Date().getFullYear();

export function InfoScreen() {
  return (
    <div className="pa3 center mw7">
      <h2 className="lh-title f5">August 2020</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Added base stats to the Pokédex</li>
        <li>Added more Pokémon to the Pokédex</li>
        <li>Improved pagination on the Pokédex</li>
        <li>Replaced page footer with Info screen</li>
      </ul>
      <h2 className="lh-title f5">December 2019</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Clicking a Pokémon reveals their defense matchups</li>
        <li>Tightened up the UI to save more space on mobile</li>
      </ul>
      <div className="mt3" />
      <h2 className="lh-title f5">November 2019</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Added most Pokémon Sword & Shield Pokémon</li>
        <li>
          Added regional variants (e.g. Alolan Raichu, Galarian Farfetch'd)
        </li>
        <li>Added Pokédex images</li>
        <li>Added search by number and better search algorithm</li>
      </ul>
      <h2 className="lh-title f5">Source Code</h2>
      <p>
        <a
          href="https://github.com/wavebeem/pkmn.help"
          className="underline dark-blue hover-blue OutlineFocus"
        >
          pkmn.help
        </a>{" "}
        repository on GitHub.
      </p>
      <h2 className="lh-title f5">Legal Info</h2>
      <p>
        Pokémon &copy; 2002-{year} Pokémon. &copy; 1995-{year}{" "}
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
          className="underline dark-blue hover-blue OutlineFocus"
          href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number"
        >
          National Pokédex
        </a>{" "}
        and{" "}
        <a
          className="underline dark-blue hover-blue OutlineFocus"
          href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VIII-present)"
        >
          List of Pokémon by base stats
        </a>{" "}
        pages.
      </p>
      <p>
        pkmn.help &copy; 2013-{year}{" "}
        <a
          href="https://www.mockbrian.com"
          className="underline dark-blue hover-blue OutlineFocus"
        >
          Brian Mock
        </a>
        .
      </p>
    </div>
  );
}
