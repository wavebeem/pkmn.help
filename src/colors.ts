export const typeColors = {
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

export function typeColorBG(key: keyof typeof typeColors): string {
  // TODO
  return typeColors.fire;
}
