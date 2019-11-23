import React from "react";
import classnames from "classnames";
import _ from "lodash";

import Paginator from "./Paginator";
import Search from "./Search";
import { Type } from "./data";
import { Pokemon } from "./pkmn";
import getImage from "./getImage";
import { clickPokemon } from "./ga";

const PAGE_SIZE = 50;

function makeType(t: Type, i: number) {
  const className = classnames(
    `type type-${t} with-border-color`,
    "ttu tc b",
    "db ph0 pv1",
    "br1 ba f6 f5-ns",
    { mt1: i > 0 }
  );
  const style = { minWidth: "6em" };
  return (
    <span key={`type-${t}`} className={className} style={style}>
      {t}
    </span>
  );
}

function makePKMN(p: Pokemon, i: number, a: Pokemon[], props: DexProps) {
  const className = classnames(
    "b--black-10",
    "ph2 pv3",
    "bb flex items-center",
    { bt: i === 0 },
    { mt3: i === 0 },
    { mb3: i === a.length - 1 }
  );
  const displayNumber = "#" + String(p.number).padStart(3, "0");
  const style = { minHeight: "100px" };
  const imgSize = 40 * 2;
  return (
    <div key={p.id} className={className} style={style}>
      <img
        src={getImage(p.id)}
        className="mr3 Pixelated"
        width={imgSize}
        height={imgSize}
      />
      <div className="flex-auto mv0">
        <a
          href="#"
          className="near-black hover-mid-gray dib mb1"
          onClick={event => {
            event.preventDefault();
            const [type1, type2] = p.types;
            props.updateType1(type1);
            props.updateType2(type2 || Type.NONE);
            props.changeTab(1);
            clickPokemon(p.id);
          }}
        >
          <h2 className="di truncate mv0 f4 f3-ns">{p.name}</h2>
        </a>
        <p className="gray mv0">{displayNumber}</p>
      </div>
      <div>{p.types.map(makeType)}</div>
    </div>
  );
}

interface DexProps {
  updateSearch(search: string): void;
  updateCurrentPage(page: number): void;
  currentPage: number;
  pkmn: Pokemon[];
  search: string;
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
      <p className="mv4 bg-washed-yellow pa2 br2 ba b--black-20">
        <b>NEW:</b> Pokémon Sword & Shield, regional variants (e.g. Alola,
        Galar), Pokédex images, click Pokémon names to view their defense
        matchups
      </p>
      <Paginator
        currentPage={currentPage}
        updatePageNext={() => updateCurrentPage(currentPage + 1)}
        updatePagePrev={() => updateCurrentPage(currentPage - 1)}
        pageSize={PAGE_SIZE}
        emptyState={<p className="silver f1 b tc m0">no pokémon found</p>}
        items={pkmn}
        render={(p, i, a) => makePKMN(p, i, a, props)}
      />
    </div>
  );
}

Dex.displayName = "Dex";

export default Dex;
