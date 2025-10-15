import React from "react";
import styles from "./Card.module.css";

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type Props = {
  title: string;
  image?: string;
  stats?: Stats;
  children?: React.ReactNode;
};

const getBaseStatProduct = (stats: Stats) =>
  stats.hp *
  stats.attack *
  stats.defense *
  stats.spAtk *
  stats.spDef *
  stats.speed;

const Card: React.FC<Props> = ({ title, image, stats, children }) => {
  const baseStatProduct = stats ? getBaseStatProduct(stats) : undefined;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {image && <img src={image} alt={title} className={styles.image} />}
      {stats && (
        <table className={styles.statsTable}>
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
              <td><strong>{baseStatProduct?.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      )}
      {children}
    </div>
  );
};

export default Card;
