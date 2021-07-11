import classnames from "classnames";
import matchSorter from "match-sorter";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Pokemon, Type, typesOrNoneFromString } from "./data";
import { getImage } from "./getImage";
import Paginator from "./Paginator";
import { pickTranslation } from "./pickTranslation";
import Search from "./Search";
import StatsTable from "./StatsTable";
import { useSearch } from "./useSearch";
import { useDebounce } from "use-debounce";
import { cssType } from "./main";

const PAGE_SIZE = 20;
const nbsp = "\u00a0";

interface MonsterTypeProps {
  type: Type;
  index: number;
}

function MonsterType({ type, index }: MonsterTypeProps) {
  return (
    <div
      className={classnames(
        cssType(type),
        `type-bg-dark`,
        "ttc tc flex",
        "pv0 ph2 lh-copy b",
        "br-pill ba border3 f6",
        { ml1: index > 0 }
      )}
    >
      {type}
    </div>
  );
}

MonsterType.displayName = "MonsterType";

interface MonsterProps {
  pokemon: Pokemon;
}

function Monster({ pokemon }: MonsterProps) {
  const displayNumber = "#" + String(pokemon.number).padStart(3, "0");
  const params = new URLSearchParams({ types: pokemon.types.join(" ") });
  const speciesName = pickTranslation(pokemon.speciesNames);
  const formName = pickTranslation(pokemon.formNames);
  return (
    <div className={classnames("fg1 pv3", "flex-ns items-center", "Monster")}>
      <div className="flex flex-column">
        <div className="flex flex-column pa3 br4 bg1 flex ba border4">
          <div className="flex items-center">
            <h2 className="mv0 f4">{speciesName}</h2>
            <div className="ph1 flex-auto" />
            <div className="fg3 mv0 tabular-nums f5">{displayNumber}</div>
          </div>
          <div className="nv2 fg3 f5">{formName || nbsp}</div>

          <div className="pv3 flex justify-center">
            <img
              src={getImage(pokemon.id)}
              role="presentation"
              alt=""
              className="db img-crisp"
              width={96}
              height={96}
            />
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
            aria-label={`Bulbapedia page for ${speciesName}`}
            className="underline fg-link OutlineFocus"
            href={pokemon.bulbapediaURL}
          >
            Bulbapedia
          </a>
          <span aria-hidden="true" className="o-50">
            &nbsp;&bull;&nbsp;
          </span>
          <Link
            aria-label={`Offense for ${speciesName} (${formName})`}
            className="underline fg-link OutlineFocus"
            to={`/offense?${params}#matchup-offense`}
          >
            Offense
          </Link>
          <span aria-hidden="true" className="o-50">
            &nbsp;&bull;&nbsp;
          </span>
          <Link
            aria-label={`Defense for ${speciesName} (${formName})`}
            className="underline fg-link OutlineFocus"
            to={`/defense?${params}#matchup-defense`}
          >
            Defense
          </Link>
        </div>
      </div>
    </div>
  );
}

Monster.displayName = "Monster";

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
  const search = useSearch();
  const history = useHistory();
  const query = search.get("q") || "";
  const [debouncedQuery] = useDebounce(query, 500);
  const page = Number(search.get("page") || 1) - 1;

  const searchablePkmn = React.useMemo(() => {
    return allPokemon.map((p) => {
      return {
        ...p,
        speciesName: pickTranslation(p.speciesNames),
        formName: pickTranslation(p.formNames),
      };
    });
  }, [allPokemon]);

  const pkmn = React.useMemo(() => {
    const s = debouncedQuery.trim();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return searchablePkmn.filter((p) => p.number === number);
    }
    const types = typesOrNoneFromString(s);
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
  }, [debouncedQuery, searchablePkmn]);

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
      <div className="flex justify-between ph2 nt2 pb3 bb border4 f6">
        <span className="fg3">Search by name, number, or types</span>
        <Link to="/pokedex/help" className="underline fg-link OutlineFocus">
          Help
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

ScreenPokedex.displayName = "ScreenPokedex";
