import React from "react";
import classnames from "classnames";
import _ from "lodash";

import Paginator from "./Paginator";
import Search from "./Search";
import { Type } from "./data";
import { Pokemon } from "./pkmn";
import getImage from "./getImage";
import { clickPokemon } from "./ga";

const PAGE_SIZE = 100;

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
  const imgSize = 40 * 2;
  return (
    <a
      href={`#${props.pokemon.id}`}
      className={classnames(
        "no-underline hover-bg-washed-blue",
        "flex items-center b--black-10 InnerFocus",
        props.index === 0 ? "" : "bt"
      )}
      onClick={event => {
        event.preventDefault();
        const [type1, type2] = props.pokemon.types;
        props.updateType1(type1);
        props.updateType2(type2 || Type.NONE);
        props.changeTab(1);
        clickPokemon(props.pokemon.id);
      }}
    >
      <img
        src={getImage(props.pokemon.id)}
        role="presentation"
        className="mr3 Pixelated"
        width={imgSize}
        height={imgSize}
      />
      <div className="flex-auto mv0">
        <div className="flex mb2 items-center">
          <div className="gray mv0 f5 code">{displayNumber}</div>
          <div className="ph1" />
          <a className="near-black ChunkyFocus">
            <h2 className="di truncate mv0 f4">{props.pokemon.name}</h2>
          </a>
        </div>
        <div className="flex">
          {props.pokemon.types.map((t, i) => (
            <MonsterType key={i} type={t} index={i} />
          ))}
        </div>
      </div>
    </a>
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

function Dex(props: DexProps) {
  const { pkmn, search, updateSearch, updateCurrentPage, currentPage } = props;
  return (
    <div className="ph2 mt3 center mw7">
      <div className="ph1" />
      <Search search={search} updateSearch={updateSearch} />
      <Paginator
        currentPage={currentPage}
        updatePageNext={() => updateCurrentPage(currentPage + 1)}
        updatePagePrev={() => updateCurrentPage(currentPage - 1)}
        pageSize={PAGE_SIZE}
        emptyState={<p className="silver f4 b tc m0">No Pokémon found</p>}
        items={pkmn}
        renderPage={page => (
          <div className="bg-white br3 ba b--black-20 overflow-hidden">
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

export default Dex;
