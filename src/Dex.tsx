import React from "react";
import classnames from "classnames";
import _ from "lodash";

import Paginator from "./Paginator";
import Search from "./Search";
import { Type } from "./data";
import { Pokemon } from "./pkmn";

const PAGE_SIZE = 50;

function makeType(t: Type, i: number) {
  const className = classnames(
    `type-${t}`,
    "ttu tc b",
    "db ph1 pv2",
    "f5-ns f6",
    "br1 ba",
    "badge with-border-color",
    { mt1: i > 0 }
  );
  const style = {
    minWidth: "7em"
  };
  const onClick = () => {
    //Change to offense tab
    //Change active type
  };
  return (
    <button key={t} className={className} style={style} onClick={onClick}>
      {t}
    </button>
  );
}

function makePKMN(p: Pokemon, i: number) {
  const className = classnames(
    "b--black-10",
    "ph2 pv3",
    "bb flex items-center",
    { bt: i === 0 },
    { mt3: i === 0 },
    { mb3: i === PAGE_SIZE - 1 }
  );
  const displayNumber = "#" + String(p.number).padStart(3, "0");
  const style = { minHeight: "100px" };
  const onClick = () => {
    document.getElementsByClassName("DefensePreview")[0].classList.toggle("hidden");
    //This doesn't change the types
    // updateType0(Type.GRASS);
  };
  return (
    <div key={`pkmn-${p.number}`} className={className} style={style} onClick={onClick}>
      <div className="flex-auto f4 f3-ns mv0">
        <h2 className="truncate mt0 mb1">{p.name}</h2>
        <p className="gray mv0">{displayNumber}</p>
      </div>
      <div>{p.types.map(makeType)}</div>
    </div>
  );
}

interface DexProps {
  changeTab: (index: number) => void;
  updateSearch(search: string): void;
  updateCurrentPage(page: number): void;
  currentPage: number;
  pkmn: Pokemon[];
  search: string;
}

function Dex(props: DexProps) {
  const { changeTab, pkmn, search, updateSearch, updateCurrentPage, currentPage } = props;
  const searchInput = <Search search={search} updateSearch={updateSearch} />;
  const emptyState = <p className="silver f1 b tc m0">no pokémon found</p>;
  setTimeout(()=>{
    changeTab(2);
  },0);
  const mons = (
    <Paginator
      currentPage={currentPage}
      updatePageNext={() => updateCurrentPage(currentPage + 1)}
      updatePagePrev={() => updateCurrentPage(currentPage - 1)}
      pageSize={PAGE_SIZE}
      emptyState={emptyState}
      items={pkmn}
      render={makePKMN}
    />
  );
  return (
      <div className="ph2 mt3 center mw7">
        <div className="ph1">{searchInput}</div>
        {mons}
      </div>
  );
}

Dex.displayName = "Dex";

export default Dex;
