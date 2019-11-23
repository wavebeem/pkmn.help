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
    `type type-${t}`,
    "ttu tc b",
    "db ph1 pv2",
    "f5-ns f6",
    "br1 ba",
    "badge with-border-color",
    { mt1: i > 0 }
  );
  const style = { minWidth: 100 };
  return (
    <span key={t} className={className} style={style}>
      {t}
    </span>
  );
}

function makePKMN(p: Pokemon, i: number, a: Pokemon[]) {
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
  return (
    // I really hope this stays unique... if not I will need to augment my data
    // sources somehow.
    <div
      key={`pkmn-${p.number}-${p.types.join("_")}`}
      className={className}
      style={style}
    >
      <div className="flex-auto f4 f3-ns mv0">
        <h2 className="truncate mt0 mb1">{p.name}</h2>
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
        emptyState={<p className="silver f1 b tc m0">no pokémon found</p>}
        items={pkmn}
        render={makePKMN}
      />
    </div>
  );
}

Dex.displayName = "Dex";

export default Dex;
