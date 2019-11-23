import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="black dark-gray bt b--black-05 ph3 pv2 mt4">
      <div className="mw8 center">
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
          Code for this page &copy; 2013-{year}{" "}
          <a
            href="https://mockbrian.com"
            className="bb link hover-gray black bb"
          >
            Brian Mock
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
