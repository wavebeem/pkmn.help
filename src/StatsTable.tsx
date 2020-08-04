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
    <table className="collapse">
      <tbody>
        <tr>
          <th className="tl">HP</th>
          <td className="tr ph2">{hp}</td>
          <td className="flex justify-center">
            <ProgressBar max={255} value={hp} color="#e46a93" />
          </td>
        </tr>
        <tr>
          <th className="tl">Attack</th>
          <td className="tr ph2">{attack}</td>
          <td className="flex justify-center">
            <ProgressBar max={255} value={attack} color="#ff9d54" />
          </td>
        </tr>
        <tr>
          <th className="tl">Defense</th>
          <td className="tr ph2">{defense}</td>
          <td className="flex justify-center">
            <ProgressBar max={255} value={defense} color="#fad143" />
          </td>
        </tr>
        <tr>
          <th className="tl">Sp. Atk.</th>
          <td className="tr ph2">{spAttack}</td>
          <td className="flex justify-center">
            <ProgressBar max={255} value={spAttack} color="#65bd55" />
          </td>
        </tr>
        <tr>
          <th className="tl">Sp. Def.</th>
          <td className="tr ph2">{spDefense}</td>
          <td className="flex justify-center">
            <ProgressBar max={255} value={spDefense} color="#4f92d6" />
          </td>
        </tr>
        <tr>
          <th className="tl">Speed</th>
          <td className="tr ph2">{speed}</td>
          <td className="flex justify-center">
            <ProgressBar max={255} value={speed} color="#eb92e4" />
          </td>
        </tr>
        <tr>
          <th className="tl">Total</th>
          <td className="tr ph2" style={{ height: 26 }}>
            {hp + attack + defense + spAttack + spDefense + speed}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
