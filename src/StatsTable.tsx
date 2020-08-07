import * as React from "react";

import { Pokemon } from "./pkmn";
import { ProgressBar } from "./ProgressBar";
import { Type } from "./data";

const STAT_MAX = 255;

export interface StatsTableProps {
  pokemon: Pokemon;
}

export function StatsTable(props: StatsTableProps) {
  const { pokemon } = props;
  const { hp, attack, defense, spAttack, spDefense, speed } = pokemon;
  return (
    <div className="StatsTable tabular-nums">
      <div className="b tl">HP</div>
      <div className="tr ph2">{hp}</div>
      <ProgressBar max={STAT_MAX} value={hp} type={Type.FIGHTING} />

      <div className="b tl">Attack</div>
      <div className="tr ph2">{attack}</div>
      <ProgressBar max={STAT_MAX} value={attack} type={Type.FIRE} />

      <div className="b tl">Defense</div>
      <div className="tr ph2">{defense}</div>
      <ProgressBar max={STAT_MAX} value={defense} type={Type.ELECTRIC} />

      <div className="b tl">Sp. Atk.</div>
      <div className="tr ph2">{spAttack}</div>
      <ProgressBar max={STAT_MAX} value={spAttack} type={Type.GRASS} />

      <div className="b tl">Sp. Def.</div>
      <div className="tr ph2">{spDefense}</div>
      <ProgressBar max={STAT_MAX} value={spDefense} type={Type.WATER} />

      <div className="b tl">Speed</div>
      <div className="tr ph2">{speed}</div>
      <ProgressBar max={STAT_MAX} value={speed} type={Type.FAIRY} />

      <div className="b tl">Total</div>
      <div className="tr ph2" style={{ height: 26 }}>
        {hp + attack + defense + spAttack + spDefense + speed}
      </div>
      <div />
    </div>
  );
}
