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

function makeType(t: Type, i: number) {
  const size = "0.75em";
  return (
    <div
      key={`type-${t}`}
      className={classnames(
        `type-${t} black`,
        "ttc tc flex items-center",
        "ph1 pv0",
        "br-pill ba f6",
        { ml1: i > 0 }
      )}
      style={{
        padding: "0.125rem 0.5rem",
        minWidth: "6em",
        background: "var(--type-color-3)",
        borderColor: "var(--type-color-2)"
      }}
    >
      <span
        className="dib br-pill mr2"
        style={{
          height: size,
          width: size,
          background: "var(--type-color-2)"
        }}
      />
      {t}
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
  const style = { minHeight: "100px" };
  const imgSize = 40 * 2;
  return (
    <div
      className={classnames(
        "pa2",
        "flex items-center b--black-10",
        props.index === 0 ? "" : "bt"
      )}
      style={style}
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
          <a
            href="#"
            className="near-black chunky-focus ThickUnderline"
            onClick={event => {
              event.preventDefault();
              const [type1, type2] = props.pokemon.types;
              props.updateType1(type1);
              props.updateType2(type2 || Type.NONE);
              props.changeTab(1);
              clickPokemon(props.pokemon.id);
            }}
          >
            <h2 className="di truncate mv0 f4">{props.pokemon.name}</h2>
          </a>
        </div>
        <div className="flex">
          {props.pokemon.types.map((t, i) => makeType(t, i))}
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
        emptyState={<p className="silver f2 b tc m0">No Pokémon found</p>}
        items={pkmn}
        renderPage={page => (
          <div className="bg-white br2 ba b--black-20">
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
