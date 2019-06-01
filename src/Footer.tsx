import React, { FC } from "react";

const Footer: FC = () => (
  <footer className="black dark-gray bt b--black-05 ph3 pv2 f4 mt4">
    <div className="mw8 center">
      <p>
        Pokémon © 2002-2013 Pokémon. © 1995-2013 Nintendo/Creatures Inc./GAME
        FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo.
      </p>
      <p>
        No copyright or trademark infringement is intended in using Pokémon
        content on this page.
      </p>
      <p>
        Code for this page © 2013-{new Date().getFullYear()}{" "}
        <a href="https://mockbrian.com" className="bb link hover-gray black bb">
          Brian Mock
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
