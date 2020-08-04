import * as React from "react";
import classnames from "classnames";
import _ from "lodash";

import { Paginator } from "./Paginator";
import { Search } from "./Search";
import { Type } from "./data";
import { Pokemon } from "./pkmn";
import { getImage } from "./getImage";
import { clickPokemon } from "./ga";
import { StatsTable } from "./StatsTable";

const PAGE_SIZE = 20;

interface MonsterTypeProps {
  type: Type;
  index: number;
}

function MonsterType(props: MonsterTypeProps) {
  return (
    <div
      className={classnames(
        `type-${props.type} type-bg-light`,
        "ttc tc flex",
        "pv0 ph2 lh-copy",
        "br1 ba b--black-10 f6",
        { ml1: props.index > 0 }
      )}
    >
      {props.type}
    </div>
  );
}

interface MonsterProps {
  pokemon: Pokemon;
  index: number;
  updateType1(type1: Type): void;
  updateType2(type2: Type): void;
  changeTab(tab: number): void;
}

function Monster(props: MonsterProps) {
  const displayNumber = "#" + String(props.pokemon.number).padStart(3, "0");
  const imgSize = 68 * 2;
  return (
    <div
      className={classnames(
        "near-black pv3",
        "flex items-center b--black-10 InnerDashedFocus",
        props.index === 0 ? "" : "bt"
      )}
    >
      <img
        src={getImage(props.pokemon.id)}
        role="presentation"
        className="mr3"
        width={imgSize}
        height={imgSize}
      />
      <div className="flex-auto mv0">
        <div className="flex mb2 items-center">
          <div className="gray mv0 code f6 f5-ns">{displayNumber}</div>
          <div className="ph1" />
          <h2 className="di truncate mv0 f5 f4-ns">
            <a
              className="near-black hover-mid-gray no-underline underline-hover SimpleFocus"
              href={`#${props.pokemon.id}`}
              onClick={(event) => {
                event.preventDefault();
                const [type1, type2] = props.pokemon.types;
                props.updateType1(type1);
                props.updateType2(type2 || Type.NONE);
                props.changeTab(1);
                clickPokemon(props.pokemon.id);
              }}
            >
              {props.pokemon.name}
            </a>
          </h2>
        </div>
        <div className="flex">
          {props.pokemon.types.map((t, i) => (
            <MonsterType key={i} type={t} index={i} />
          ))}
        </div>
        <div className="mt2">
          <StatsTable pokemon={props.pokemon} />
        </div>
      </div>
    </div>
  );
}

interface DexProps {
  updateSearch(search: string): void;
  updateCurrentPage(page: number): void;
  currentPage: number;
  pkmn: Pokemon[];
  search: string;
  updateType0(type: Type): void;
  updateType1(type: Type): void;
  updateType2(type: Type): void;
  changeTab(tab: number): void;
}

export function Dex(props: DexProps) {
  const { pkmn, search, updateSearch, updateCurrentPage, currentPage } = props;
  return (
    <div className="ph2-ns mt3 center mw7">
      <div className="ph1" />
      <Search search={search} updateSearch={updateSearch} />
      <Paginator
        currentPage={currentPage}
        updatePageNext={() => updateCurrentPage(currentPage + 1)}
        updatePagePrev={() => updateCurrentPage(currentPage - 1)}
        pageSize={PAGE_SIZE}
        emptyState={<p className="silver f4 b tc m0">No Pokémon found</p>}
        items={pkmn}
        renderPage={(page) => (
          <div className="bg-white br3-ns bt bb bl-ns br-ns b--black-20 overflow-hidden">
            {page.map((pokemon, index) => (
              <Monster
                key={pokemon.id}
                pokemon={pokemon}
                index={index}
                updateType1={props.updateType1}
                updateType2={props.updateType2}
                changeTab={props.changeTab}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}

Dex.displayName = "Dex";
