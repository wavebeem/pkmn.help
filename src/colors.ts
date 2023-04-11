import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import lchPlugin from "colord/plugins/lch";

extend([a11yPlugin, lchPlugin]);

const typeColors = {
  normal: "#9fa19f",
  fighting: "#ff8000",
  flying: "#81b9ef",
  poison: "#9141cb",
  ground: "#915121",
  rock: "#afa981",
  bug: "#91a119",
  ghost: "#704170",
  steel: "#60a1b8",
  fire: "#e62829",
  water: "#2980ef",
  grass: "#3fa129",
  electric: "#fac000",
  psychic: "#ef4179",
  ice: "#3fd8ff",
  dragon: "#5060e1",
  dark: "#50413f",
  fairy: "#ef70ef",
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
