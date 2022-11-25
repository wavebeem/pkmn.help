import classNames from "classnames";
import matchSorter from "match-sorter";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Pokemon, Type, typesFromUserInput } from "./data-types";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { formatPokemonName } from "./formatPokemonName";
import { MonsterImage } from "./MonsterImage";
import { MonsterType } from "./MonsterType";
import { Paginator } from "./Paginator";
import { pickTranslation } from "./pickTranslation";
import { Search } from "./Search";
import { StatsTable } from "./StatsTable";
import { useLanguage } from "./useLanguage";
import { useSearch } from "./useSearch";

const nbsp = "\u00a0";

function getWikiLink(lang: string, pkmn: Pokemon): string {
  const name = pickTranslation(pkmn.speciesNames, lang);
  switch (lang) {
    default:
    case "en":
      return `https://bulbapedia.bulbagarden.net/wiki/${name}`;
    case "de":
      return `https://www.pokewiki.de/${name}`;
    case "es":
      return `https://www.wikidex.net/wiki/${name}`;
    case "fr":
      return `https://www.pokepedia.fr/${name}`;
    case "it":
      return `https://wiki.pokemoncentral.it/${name}`;
    case "ja":
      return `https://wiki.ポケモン.com/wiki/${name}`;
    case "zh-Hans":
    case "zh-Hant":
      return `https://wiki.52poke.com/wiki/${name}`;
  }
}

function getWikiName(lang: string): string {
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
  }
}

interface MonsterProps {
  pokemon: Pokemon;
}

function Monster({ pokemon }: MonsterProps) {
  const { t, i18n } = useTranslation();
  const [language] = useLanguage();
  const displayNumber = formatMonsterNumber(pokemon.number);
  const params = new URLSearchParams({ types: pokemon.types.join(" ") });
  const speciesName = pokemon.speciesNames[language] || pokemon.speciesNames.en;
  const formName = pokemon.formNames[language] || pokemon.formNames.en;
  const pokemonName = formatPokemonName({ speciesName, formName });
  const formattedFormName = formName ? `(${formName})` : nbsp;
  return (
    <div
      className={classNames(
        "fg1 mv3",
        "flex flex-column items-stretch",
        "gap4",
        "pa3 br3 bg1 ba border2 button-shadow"
      )}
    >
      <div className="flex flex flex-column flex-row-ns items-center-ns gap2">
        <div className="flex items-center gap2">
          <div className="fg3 mv0 tabular-nums f5">{displayNumber}</div>
          <h2 className="mv0 f4 flex-auto">{speciesName}</h2>
        </div>
        <div className="nv2 fg3 f5">{formattedFormName}</div>
      </div>
      <div className="flex flex-column flex-row-l gap3">
        <div className="flex flex-column">
          <div className="flex flex-column">
            <div className="pv3 flex justify-center">
              <MonsterImage
                scale={2}
                pokemonID={pokemon.id}
                types={pokemon.types}
                imageType={pokemon.imageType}
              />
            </div>
            <div className="flex gap1 justify-center">
              {pokemon.types.map((t, i) => (
                <MonsterType key={i} type={t} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-column justify-center flex-auto gap3">
          <StatsTable pokemon={pokemon} />
          <div className="flex flex-auto items-end justify-end">
            <a
              title={t("pokedex.wiki.label", { pokemon: pokemonName })}
              aria-label={t("pokedex.wiki.label", { pokemon: pokemonName })}
              className="br1 underline fg-link OutlineFocus"
              href={getWikiLink(i18n.language, pokemon)}
            >
              {getWikiName(i18n.language)}
            </a>
            <span aria-hidden="true" className="o-50">
              &nbsp;&bull;&nbsp;
            </span>
            <Link
              title={t("pokedex.offense.label", { pokemon: pokemonName })}
              aria-label={t("pokedex.offense.label", { pokemon: pokemonName })}
              className="br1 underline fg-link OutlineFocus"
              to={`/offense/?${params}#matchup-offense`}
            >
              {t("pokedex.offense.text")}
            </Link>
            <span aria-hidden="true" className="o-50">
              &nbsp;&bull;&nbsp;
            </span>
            <Link
              title={t("pokedex.defense.label", { pokemon: pokemonName })}
              aria-label={t("pokedex.defense.label", { pokemon: pokemonName })}
              className="br1 underline fg-link OutlineFocus"
              to={`/defense/?${params}#matchup-defense`}
            >
              {t("pokedex.defense.text")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DexProps {
  allPokemon: Pokemon[];
  setPokedexParams: (params: string) => void;
  isLoading: boolean;
}

export function ScreenPokedex({
  allPokemon,
  setPokedexParams,
  isLoading,
}: DexProps) {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const search = useSearch();
  const history = useHistory();
  const query = search.get("q") || "";
  const [debouncedQuery] = useDebounce(query, 500);
  const page = Number(search.get("page") || 1) - 1;

  const searchablePkmn = React.useMemo(() => {
    return allPokemon.map((p) => {
      return {
        ...p,
        speciesName: pickTranslation(p.speciesNames, language),
        formName: pickTranslation(p.formNames, language),
      };
    });
  }, [allPokemon, language]);

  const pkmn = React.useMemo(() => {
    const s = debouncedQuery.trim().toLocaleLowerCase();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return searchablePkmn.filter((p) => p.number === number);
    }
    // The return value of `t` depends on the current value of `language`, but
    // the rules of hooks can't realize these. Pretend to use `language` here to
    // make it happy.
    language;
    const types = typesFromUserInput({ types: s, t, strict: true });
    if (types.length > 0) {
      return searchablePkmn.filter((p) => {
        if (types.length === 1) {
          return p.types[0] === types[0] || p.types[1] === types[0];
        }
        if (types.length === 2 && types[1] === Type.NONE) {
          return p.types.length === 1 && p.types[0] === types[0];
        }
        return (
          p.types.slice().sort().join(" ") === types.slice().sort().join(" ")
        );
      });
    }
    return matchSorter(searchablePkmn, s, {
      keys: ["speciesName", "formName", "number"],
    });
  }, [debouncedQuery, searchablePkmn, language, t]);

  function createParams(newQuery: string, newPage: number): string {
    const params = new URLSearchParams();
    if (newQuery) {
      params.set("q", newQuery);
    }
    if (Number(newPage) > 0) {
      params.set("page", String(newPage + 1));
    }
    return "?" + params;
  }

  function update(newQuery: string, newPage: number) {
    const params = createParams(newQuery, newPage);
    history.replace({ search: params });
  }

  const params = createParams(query, page);
  React.useEffect(() => {
    setPokedexParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <main className="ph3 mt3 center content-narrow">
      <Search
        search={query}
        updateSearch={(newQuery) => {
          update(newQuery, 0);
        }}
      />
      <div className="flex justify-between ph2 nt2 pb3 bb border3 f6">
        <span className="fg3" aria-hidden="true">
          {t("pokedex.search.description")}
        </span>
        <Link
          to="/pokedex/help/"
          className="br1 underline fg-link OutlineFocus ml3 flex-none"
          aria-label={t("pokedex.search.helpLong")}
        >
          {t("pokedex.search.help")}
        </Link>
      </div>
      {isLoading ? (
        <div className="Spinner center mt4 f2" />
      ) : (
        <Paginator
          currentPage={page}
          urlForPage={(newPage) => {
            return createParams(query, newPage);
          }}
          pageSize={20}
          emptyState={
            <p className="fg4 f4 b tc m0">{t("pokedex.search.notFound")}</p>
          }
          items={pkmn}
          renderPage={(page) =>
            page.map((pokemon) => (
              <Monster key={pokemon.id} pokemon={pokemon} />
            ))
          }
        />
      )}
      <div className="pb4" />
    </main>
  );
}
