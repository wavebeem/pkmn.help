import React from "react";
import styles from "./StatsTable.module.css";

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type Props = {
  stats: Stats;
};

const getBaseStatProduct = (stats: Stats) => {
  return (
    stats.hp *
    stats.attack *
    stats.defense *
    stats.spAtk *
    stats.spDef *
    stats.speed
  );
};

const StatsTable: React.FC<Props> = ({ stats }) => {
  const baseStatProduct = getBaseStatProduct(stats);

  return (
    <table className={styles.statsTable}>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HP</td>
          <td>{stats.hp}</td>
        </tr>
        <tr>
          <td>Attack</td>
          <td>{stats.attack}</td>
        </tr>
        <tr>
          <td>Defense</td>
          <td>{stats.defense}</td>
        </tr>
        <tr>
          <td>Sp. Atk</td>
          <td>{stats.spAtk}</td>
        </tr>
        <tr>
          <td>Sp. Def</td>
          <td>{stats.spDef}</td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>{stats.speed}</td>
        </tr>
        <tr className={styles.baseStatProductRow}>
          <td><strong>Base Stat Product</strong></td>
          <td><strong>{baseStatProduct.toLocaleString()}</strong></td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatsTable;
