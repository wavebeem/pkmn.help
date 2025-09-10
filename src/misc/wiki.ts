import { Pokemon } from "./data-types";
import { pickTranslation } from "./pickTranslation";

export function getWikiLink(lang: string, pkmn: Pokemon): string {
  function getName(lang: string) {
    return encodeURIComponent(
      pickTranslation(pkmn.speciesNames, lang).replace(/ /g, "_"),
    );
  }
  switch (lang) {
    default:
    case "en":
      return `https://bulbapedia.bulbagarden.net/wiki/${getName(
        "en",
      )}_(Pokémon)`;
    case "de":
      return `https://www.pokewiki.de/${getName("de")}`;
    case "es":
      return `https://www.wikidex.net/wiki/${getName("es")}`;
    case "fr":
      return `https://www.pokepedia.fr/${getName("fr")}`;
    case "it":
      return `https://wiki.pokemoncentral.it/${getName("it")}`;
    case "ja":
      return `https://wiki.ポケモン.com/wiki/${getName("ja")}`;
    case "zh-Hans":
    case "zh-Hant":
      return `https://wiki.52poke.com/wiki/${getName("zt-Hans")}`;
    case "ko":
      return `https://namu.wiki/w/${getName("ko")}`;
  }
}

export function getWikiName(lang: string): string {
  switch (lang) {
    default:
    case "en":
      return "Bulbapedia";
    case "de":
      return "PokéWiki";
    case "es":
      return "WikiDex";
    case "fr":
      return "Poképédia";
    case "it":
      return "Pokémon Central";
    case "ja":
      return "ポケモンWiki";
    case "zh-Hans":
    case "zh-Hant":
      return "神奇宝贝百科";
    case "ko":
      return "나무위키";
  }
}
