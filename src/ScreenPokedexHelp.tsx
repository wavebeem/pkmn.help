import * as React from "react";
import { Link } from "react-router-dom";

interface ScreenPokdexHelpProps {
  pokedexParams: string;
}

export default function ScreenPokdexHelp({
  pokedexParams,
}: ScreenPokdexHelpProps) {
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f4">Search by name</h2>
      <p>
        You can search for a Pokémon by name. If you only remember part of the
        Pokémon&apos;s name, It can still probably find it for you. It
        can&apos;t deal with typos right now though.
      </p>
      <h2 className="lh-title f4">Search by number</h2>
      <p>
        Search by national dex number. If you want Bulbsaur, just type <i>1</i>,
        not <i>#001</i>.
      </p>
      <h2 className="lh-title f4">Search by type</h2>
      <p>Here are a few examples of how to seach by type.</p>
      <ul className="pl3">
        <li>
          <code className="dib br2 ph2 bg3">fire</code>
          <p>
            Search for Pokémon that have a fire as either of their types in any
            form (e.g. Charmander, Charizard, Rotom).
          </p>
        </li>
        <li>
          <code className="dib br2 ph2 bg3">water flying</code>
          <p>
            Search for Pokémon that are either water/flying (e.g. Gyarados) or
            flying/water (e.g. Cramorant).
          </p>
        </li>
        <li>
          <code className="dib br2 ph2 bg3">grass none</code>
          <p>
            Search for Pokémon that are only grass type, no 2nd type (e.g.
            Tangela, Chikorita).
          </p>
        </li>
      </ul>
      <p>
        <Link
          to={`/pokedex${pokedexParams}`}
          className="underline fg-link OutlineFocus"
          aria-label="Back to Pokédex"
        >
          &larr; Back to Pokédex
        </Link>
      </p>
    </main>
  );
}
