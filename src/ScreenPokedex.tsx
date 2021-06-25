import classnames from "classnames";
import matchSorter from "match-sorter";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Type } from "./data";
import { getImage } from "./getImage";
import Paginator from "./Paginator";
import { pickTranslation } from "./pickTranslation";
import { AllPokemon, Pokemon } from "./pkmn";
import Search from "./Search";
import StatsTable from "./StatsTable";
import { useSearch } from "./useSearch";

const PAGE_SIZE = 20;
const nbsp = "\u00a0";

interface MonsterTypeProps {
  type: Type;
  index: number;
}

function MonsterType(props: MonsterTypeProps) {
  return (
    <div
      className={classnames(
        `type-${props.type} type-bg-dark`,
        "ttc tc flex",
        "pv0 ph2 lh-copy b",
        "br-pill ba border3 f6",
        { ml1: props.index > 0 }
      )}
    >
      {props.type}
    </div>
  );
}

MonsterType.displayName = "MonsterType";

interface MonsterProps {
  pokemon: Pokemon;
  index: number;
}

function Monster(props: MonsterProps) {
  const displayNumber = "#" + String(props.pokemon.number).padStart(3, "0");
  const params = new URLSearchParams({ types: props.pokemon.types.join(" ") });
  const speciesName = pickTranslation(props.pokemon.speciesNames);
  const formName = pickTranslation(props.pokemon.formNames);
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
              src={getImage(props.pokemon.id)}
              role="presentation"
              alt=""
              className="db img-crisp"
              width={96}
              height={96}
            />
          </div>

          <div className="pt2 flex justify-end">
            {props.pokemon.types.map((t, i) => (
              <MonsterType key={i} type={t} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-column">
        <StatsTable pokemon={props.pokemon} />
        <div className="flex justify-end">
          <Link
            aria-label={`Offense for ${speciesName} (${formName})`}
            className="underline fg-link OutlineFocus"
            to={`/offense?${params}`}
          >
            Offense
          </Link>
          <span aria-hidden="true" className="o-50">
            &nbsp;&bull;&nbsp;
          </span>
          <Link
            aria-label={`Defense for ${speciesName} (${formName})`}
            className="underline fg-link OutlineFocus"
            to={`/defense?${params}`}
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
  setPokedexParams: (params: string) => void;
}

export default function ScreenPokedex(props: DexProps) {
  const search = useSearch();
  const history = useHistory();

  const query = search.get("q") || "";
  const page = Number(search.get("page") || 1) - 1;

  const pkmn = React.useMemo(() => {
    const s = query.trim();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return AllPokemon.filter((p) => p.number === number);
    }
    return matchSorter(AllPokemon, s, { keys: ["name", "number"] });
  }, [query]);

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
    props.setPokedexParams(params);
  }, [params]);

  return (
    <main className="ph3 mt3 center content-narrow">
      <Search
        search={query}
        updateSearch={(newQuery) => {
          update(newQuery, 0);
        }}
      />
      <Paginator
        currentPage={page}
        urlForPage={(newPage) => {
          return createParams(query, newPage);
        }}
        pageSize={PAGE_SIZE}
        emptyState={<p className="fg4 f4 b tc m0">No Pokémon found</p>}
        items={pkmn}
        renderPage={(page) =>
          page.map((pokemon, index) => (
            <Monster key={pokemon.id} pokemon={pokemon} index={index} />
          ))
        }
      />
    </main>
  );
}

ScreenPokedex.displayName = "ScreenPokedex";
