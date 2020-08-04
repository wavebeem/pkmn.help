import * as React from "react";

const year = new Date().getFullYear();

export function InfoScreen() {
  return (
    <div className="pa3 center mw7">
      <h2 className="lh-title f5">August 2020</h2>
      <ul className="lh-copy mt1 ph3">
        <li>Added base stats to the Pokédex</li>
        <li>Added more Pokémon to the Pokédex</li>
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
      <h2 className="lh-title f5">Legal</h2>
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
