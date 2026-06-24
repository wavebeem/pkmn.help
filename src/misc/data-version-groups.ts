const versionGroups = [
  "red-blue",
  "yellow",
  "red-green-japan",
  "blue-japan",
  "gold-silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "firered-leafgreen",
  "colosseum",
  "xd",
  "diamond-pearl",
  "platinum",
  "heartgold-soulsilver",
  "black-white",
  "black-2-white-2",
  "x-y",
  "omega-ruby-alpha-sapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "lets-go-pikachu-lets-go-eevee",
  "sword-shield",
  "the-isle-of-armor",
  "the-crown-tundra",
  "brilliant-diamond-shining-pearl",
  "legends-arceus",
  "scarlet-violet",
  "the-teal-mask",
  "the-indigo-disk",
  "legends-za",
  "mega-dimension",
  "champions",
  "", // National
] as const;

export type VersionGroup = (typeof versionGroups)[number];

const versionGroupSet = new Set<string>(versionGroups);

export function isVersionGroup(
  versionGroup: string,
): versionGroup is VersionGroup {
  return versionGroupSet.has(versionGroup);
}
