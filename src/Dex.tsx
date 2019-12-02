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

function makeType(t: Type, i: number, props: DexProps) {
  const size = "0.75em";
  return (
    <a
      href="#"
      onClick={event => {
        event.preventDefault();
        props.updateType0(t);
        props.changeTab(0);
      }}
      key={`type-${t}`}
      className={classnames(
        `no-underline underline-hover type-${t} black`,
        "ttc tc b flex items-center",
        "db ph1 pv0",
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
    </a>
  );
}

function makePKMN(p: Pokemon, i: number, _a: Pokemon[], props: DexProps) {
  const className = classnames(
    "pa2",
    "flex items-center b--black-10",
    i === 0 ? "" : "bt"
  );
  const displayNumber = "#" + String(p.number).padStart(3, "0");
  const style = { minHeight: "100px" };
  const imgSize = 40 * 2;
  return (
    <div key={p.id} className={className} style={style}>
      <img
        src={getImage(p.id)}
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
              const [type1, type2] = p.types;
              props.updateType1(type1);
              props.updateType2(type2 || Type.NONE);
              props.changeTab(1);
              clickPokemon(p.id);
            }}
          >
            <h2 className="di truncate mv0 f4">{p.name}</h2>
          </a>
        </div>
        <div className="flex">
          {p.types.map((p, i) => makeType(p, i, props))}
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
            {page.map((p, i, a) => makePKMN(p, i, a, props))}
          </div>
        )}
      />
    </div>
  );
}

Dex.displayName = "Dex";

export default Dex;
