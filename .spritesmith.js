"use strict";

module.exports = {
  src: "./img/*.png",
  destImage: "./public/spritesheet.png",
  destCSS: "./src/spritesheet.css",
  imgPath: "/spritesheet.png",
  padding: 2,
  cssOpts: {
    cssClass: ({ name }) => `.pkmn-${name}`,
  },
};
