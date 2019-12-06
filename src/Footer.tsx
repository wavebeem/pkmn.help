import React from "react";

import { ReleaseNotes } from "./ReleaseNotes";

export default function Footer() {
  const [isReleaseNotesOpen, setIsReleaseNotesOpen] = React.useState(false);
  const year = new Date().getFullYear();
  return (
    <footer className="black dark-gray bt b--black-05 ph3 pv2">
      <div className="mw7 center">
        <p>
          <a
            href="#"
            className="ThickUnderline b near-black hover-gray ChunkyFocus"
            onClick={event => {
              event.preventDefault();
              setIsReleaseNotesOpen(!isReleaseNotesOpen);
            }}
          >
            {isReleaseNotesOpen ? (
              <React.Fragment>Hide release notes</React.Fragment>
            ) : (
              <React.Fragment>Show release notes</React.Fragment>
            )}
          </a>
          {isReleaseNotesOpen ? <ReleaseNotes /> : null}
        </p>
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
            href="https://mockbrian.com"
            className="b ThickUnderline near-black hover-gray ChunkyFocus"
          >
            Brian Mock
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
