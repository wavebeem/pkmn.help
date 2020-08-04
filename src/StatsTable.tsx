import * as React from "react";

import { Pokemon } from "./pkmn";
import { ProgressBar } from "./ProgressBar";

export interface StatsTableProps {
  pokemon: Pokemon;
}

export function StatsTable(props: StatsTableProps) {
  const { pokemon } = props;
  const { hp, attack, defense, spAttack, spDefense, speed } = pokemon;
  return (
    <div className="StatsTable">
      <div className="b tl">HP</div>
      <div className="tr ph2">{hp}</div>
      <ProgressBar max={255} value={hp} color="#e46a93" />

      <div className="b tl">Attack</div>
      <div className="tr ph2">{attack}</div>
      <ProgressBar max={255} value={attack} color="#ff9d54" />

      <div className="b tl">Defense</div>
      <div className="tr ph2">{defense}</div>
      <ProgressBar max={255} value={defense} color="#fad143" />

      <div className="b tl">Sp. Atk.</div>
      <div className="tr ph2">{spAttack}</div>
      <ProgressBar max={255} value={spAttack} color="#65bd55" />

      <div className="b tl">Sp. Def.</div>
      <div className="tr ph2">{spDefense}</div>
      <ProgressBar max={255} value={spDefense} color="#4f92d6" />

      <div className="b tl">Speed</div>
      <div className="tr ph2">{speed}</div>
      <ProgressBar max={255} value={speed} color="#eb92e4" />

      <div className="b tl">Total</div>
      <div className="tr ph2" style={{ height: 26 }}>
        {hp + attack + defense + spAttack + spDefense + speed}
      </div>
      <div />
    </div>
  );
}
