import React from "react";

export function ReleaseNotes(props: React.BaseHTMLAttributes<never>) {
  return (
    <p className="bg-washed-yellow pa2 br3 ba b--black-20" {...props}>
      <h2 className="lh-title f5 mv0">December 2019 Updates</h2>
      <ul className="lh-copy mb0 mt1 ph3">
        <li>Clicking a Pokémon reveals their defense matchups</li>
        <li>Tightened up the UI to save more space on mobile</li>
      </ul>
      <div className="mt3" />
      <h2 className="lh-title f5 mv0">November 2019 Updates</h2>
      <ul className="lh-copy mb0 mt1 ph3">
        <li>Added most Pokémon Sword & Shield Pokémon</li>
        <li>
          Added regional variants (e.g. Alolan Raichu, Galarian Farfetch'd)
        </li>
        <li>Added Pokédex images</li>
        <li>Added search by number and better search algorithm</li>
      </ul>
    </p>
  );
}
