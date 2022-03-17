import classNames from "classnames";
import matchSorter from "match-sorter";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import { Pokemon, Type, typesFromUserInput } from "./data";
import { formatPokemonName } from "./formatPokemonName";
import { MonsterImage } from "./MonsterImage";
import Paginator from "./Paginator";
import { pickTranslation } from "./pickTranslation";
import Search from "./Search";
import StatsTable from "./StatsTable";
import { useLanguage } from "./useLanguage";
import { useSearch } from "./useSearch";

const PAGE_SIZE = 20;
const nbsp = "\u00a0";

interface MonsterTypeProps {
  type: Type;
  index: number;
}

function MonsterType({ type, index }: MonsterTypeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        "type-bg",
        "ttc tc flex",
        "lh-title b",
        "br-pill ba border-vibrant f6",
        { ml1: index > 0 }
      )}
      style={{
        padding: 2,
        ["--type-color" as any]: typeColor(type),
      }}
    >
      <div
        className="white br-pill ba b--black-10 ph2"
        style={{
          background: typeColorBG(type),
          borderColor: typeColorBorder(type),
        }}
      >
        {t(`types.${type}`)}
      </div>
    </div>
  );
}

interface MonsterProps {
  pokemon: Pokemon;
}

function Monster({ pokemon }: MonsterProps) {
  const { t } = useTranslation();
  const [language] = useLanguage();
  const displayNumber = "#" + String(pokemon.number).padStart(3, "0");
  const params = new URLSearchParams({ types: pokemon.types.join(" ") });
  const speciesName = pokemon.speciesNames[language];
  const formName = pokemon.formNames[language];
  const pokemonName = formatPokemonName({ speciesName, formName });
  return (
    <div className={classNames("fg1 pv3", "flex-ns items-center", "Monster")}>
      <div className="flex flex-column">
        <div className="flex flex-column pa3 br3 bg1 flex ba border3">
          <div className="flex items-center">
            <h2 className="mv0 f4">{speciesName}</h2>
            <div className="ph1 flex-auto" />
            <div className="fg3 mv0 tabular-nums f5">{displayNumber}</div>
          </div>
          <div className="nv2 fg3 f5">{formName || nbsp}</div>

          <div className="pv3 flex justify-center">
            <MonsterImage pokemonID={pokemon.id} types={pokemon.types} />
          </div>

          <div className="pt2 flex justify-end">
            {pokemon.types.map((t, i) => (
              <MonsterType key={i} type={t} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-column">
        <StatsTable pokemon={pokemon} />
        <div className="flex justify-end">
          <a
            aria-label={t("pokedex.bulbapedia.label", {
              replace: { pokemon: pokemonName },
            })}
            className="br1 underline fg-link OutlineFocus"
            href={pokemon.bulbapediaURL}
          >
            Bulbapedia
          </a>
          <span aria-hidden="true" className="o-50">
            &nbsp;&bull;&nbsp;
          </span>
          <Link
            aria-label={t("pokedex.offense.label", {
              replace: { pokemon: pokemonName },
            })}
            className="br1 underline fg-link OutlineFocus"
            to={`/offense/?${params}#matchup-offense`}
          >
            {t("pokedex.offense.text")}
          </Link>
          <span aria-hidden="true" className="o-50">
            &nbsp;&bull;&nbsp;
          </span>
          <Link
            aria-label={t("pokedex.defense.label", {
              replace: { pokemon: pokemonName },
            })}
            className="br1 underline fg-link OutlineFocus"
            to={`/defense/?${params}#matchup-defense`}
          >
            {t("pokedex.defense.text")}
          </Link>
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

export default function ScreenPokedex({
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
          pageSize={PAGE_SIZE}
          emptyState={<p className="fg4 f4 b tc m0">No Pokémon found</p>}
          items={pkmn}
          renderPage={(page) =>
            page.map((pokemon) => (
              <Monster key={pokemon.id} pokemon={pokemon} />
            ))
          }
        />
      )}
    </main>
  );
}
