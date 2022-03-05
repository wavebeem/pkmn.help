import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import lchPlugin from "colord/plugins/lch";

extend([a11yPlugin, lchPlugin]);

const typeColors = {
  fire: "#ff9d54",
  water: "#4f92d6",
  grass: "#65bd55",
  electric: "#fad143",
  psychic: "#f97175",
  ice: "#72cfbd",
  dragon: "#116ac4",
  dark: "#5b5464",
  fairy: "#eb92e4",
  normal: "#929da3",
  fighting: "#ce436a",
  flying: "#8caadc",
  poison: "#ac66c8",
  ground: "#d97946",
  rock: "#c6b887",
  bug: "#90c127",
  ghost: "#4e6caa",
  steel: "#518ea3",
  none: "#808080",
} as const;

export function typeColor(key: keyof typeof typeColors): string {
  return typeColors[key];
}

export function typeColorBG(key: keyof typeof typeColors): string {
  return darken({
    bg: typeColors[key],
    fg: "#fff",
    contrast: 4.5,
    min: 10,
  });
}

export function typeColorBorder(key: keyof typeof typeColors): string {
  return darken({
    bg: typeColors[key],
    fg: "#fff",
    contrast: 4.5,
    min: 15,
  });
}

function darken({
  bg,
  fg,
  min,
  contrast,
}: {
  bg: string;
  fg: string;
  min: number;
  contrast: number;
}): string {
  const key = [bg, fg, min, contrast].join(" ");
  let val = cache.get(key);
  if (val) {
    return val;
  }
  const lch = colord(bg).toLch();
  const { l } = lch;
  while (colord(lch).contrast(fg) < contrast) {
    lch.l--;
  }
  if (Math.abs(lch.l - l) < min) {
    lch.l = l - min;
  }
  val = colord(lch).toHex();
  cache.set(key, val);
  return val;
}

const cache = new Map<string, string>();
