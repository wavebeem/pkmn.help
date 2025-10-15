import React from "react";
import styles from "./ScreenPokedex.module.css";

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type Pokemon = {
  name: string;
  stats: Stats;
  sprite: string;
};

type Props = {
  pokemon: Pokemon;
};

const getBaseStatProduct = (stats: Stats): number => {
  return (
    stats.hp *
    stats.attack *
    stats.defense *
    stats.spAtk *
    stats.spDef *
    stats.speed
  );
};

const ScreenPokedex: React.FC<Props> = ({ pokemon }) => {
  const { name, stats, sprite } = pokemon;
  const baseStatProduct = getBaseStatProduct(stats);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{name}</h2>
      <img src={sprite} alt={name} className={styles.sprite} />
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
    </div>
  );
};

export default ScreenPokedex;
