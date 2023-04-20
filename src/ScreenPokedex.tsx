import classNames from "classnames";
import matchSorter from "match-sorter";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Pokemon, Type, typesFromUserInput } from "./data-types";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { MonsterImage } from "./MonsterImage";
import { MonsterType } from "./MonsterType";
import { Paginator } from "./Paginator";
import { pickTranslation } from "./pickTranslation";
import { Search } from "./Search";
import { StatsTable } from "./StatsTable";
import { useComputedLanguage } from "./useComputedLanguage";
import { useSearch } from "./useSearch";
import { IconSparkles } from "./IconSparkles";
import styles from "./ScreenPokedex.module.css";
import Spinner from "./Spinner";

const nbsp = "\u00a0";

function getWikiLink(lang: string, pkmn: Pokemon): string {
  const name = encodeURIComponent(
    pickTranslation(pkmn.speciesNames, lang).replace(/ /g, "_")
  );
  switch (lang) {
    default:
    case "en":
      return `https://bulbapedia.bulbagarden.net/wiki/${name}_(Pokémon)`;
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
  const language = useComputedLanguage();
  const [shiny, setShiny] = React.useState(false);
  const displayNumber = formatMonsterNumber(pokemon.number);
  const params = new URLSearchParams({ types: pokemon.types.join(" ") });
  const speciesName = pokemon.speciesNames[language] || pokemon.speciesNames.en;
  const formName = pokemon.formNames[language] || pokemon.formNames.en;
  const formattedFormName = formName ? `(${formName})` : nbsp;
  const idPrefix = `pokemon-${pokemon.id}`;
  return (
    <div
      className={classNames(
        "fg1 mv3",
        "flex flex-column items-stretch",
        "gap4",
        "relative",
        "pa3 br3 bg1 ba border2 button-shadow"
      )}
    >
      <div className="flex flex flex-column flex-row-ns items-center-ns gap2">
        <div className="flex items-center gap2">
          <div className="fg3 mv0 tabular-nums f5">{displayNumber}</div>
          <h2 className="mv0 f4 flex-auto" id={`${idPrefix}-name`}>
            {speciesName}
          </h2>
        </div>
        <div className="nv2 fg3 f5" id={`${idPrefix}-form`}>
          {formattedFormName}
        </div>
        {pokemon.hasShiny && (
          <button
            className={classNames(
              "br-pill ba pa2 flex select-none gap1 items-center active-squish fill-currentcolor",
              styles.shinyButton,
              "button-shadow"
            )}
            title={t("pokedex.shiny.text")}
            aria-labelledby={`${idPrefix}-shiny ${idPrefix}-name ${idPrefix}-form`}
            aria-pressed={shiny ? "true" : "false"}
            onClick={() => {
              setShiny(!shiny);
            }}
          >
            <IconSparkles />
            <span hidden id={`${idPrefix}-shiny`}>
              {t("pokedex.shiny.text")}
            </span>
          </button>
        )}
      </div>
      <div className={`${styles.monster} gap3`}>
        <div className={`${styles.monsterIcon} flex flex-column`}>
          <div className="flex flex-column">
            <div className="pv3 flex justify-center">
              <MonsterImage
                scale={2}
                pokemonID={pokemon.id}
                types={pokemon.types}
                imageType={pokemon.imageType}
                shiny={shiny}
              />
            </div>
            <div className="flex gap1 justify-center">
              {pokemon.types.map((t, i) => (
                <MonsterType key={i} type={t} />
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.monsterLinks} flex flex-wrap gap3`}>
          <a
            aria-labelledby={`${idPrefix}-wiki ${idPrefix}-name ${idPrefix}-form`}
            className="br1 underline fg-link focus-outline"
            href={getWikiLink(i18n.language, pokemon)}
            id={`${idPrefix}-wiki`}
          >
            {getWikiName(i18n.language)}
          </a>
          <Link
            aria-labelledby={`${idPrefix}-offense ${idPrefix}-name ${idPrefix}-form`}
            className="br1 underline fg-link focus-outline"
            to={`/offense/?${params}#matchup-offense`}
            id={`${idPrefix}-offense`}
          >
            {t("pokedex.offense.text")}
          </Link>
          <Link
            aria-labelledby={`${idPrefix}-defense ${idPrefix}-name ${idPrefix}-form`}
            className="br1 underline fg-link focus-outline"
            to={`/defense/?${params}#matchup-defense`}
            id={`${idPrefix}-defense`}
          >
            {t("pokedex.defense.text")}
          </Link>
        </div>
        <div
          className={`${styles.monsterStats} flex flex-column justify-center flex-auto gap3`}
        >
          <StatsTable pokemon={pokemon} />
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
        if (types.length === 2 && types[1] === Type.none) {
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
          className="br1 underline fg-link focus-outline ml3 flex-none"
          aria-label={t("pokedex.search.helpLong")}
        >
          {t("pokedex.search.help")}
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
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
          renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
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
