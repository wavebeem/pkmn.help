import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { Pokemon, Type } from "./data-types";
import { StatBar } from "./StatBar";
import styles from "./StatsTable.module.css";

const statMax = 255;

export interface StatsTableProps {
  pokemon: Pokemon;
}

export function StatsTable({ pokemon }: StatsTableProps) {
  const { hp, attack, defense, spAttack, spDefense, speed } = pokemon;
  const { t } = useTranslation();
  const hasRoomForFullText = useMediaQuery("(min-width: 600px)");

  return (
    <div className={`${styles.table} tabular-nums`}>
      <div
        className="b tl"
        title={t("pokedex.stats.hpLong")}
        aria-label={t("pokedex.stats.hpLong")}
      >
        {t("pokedex.stats.hp")}
      </div>
      <div className="tr">{hp}</div>
      <StatBar max={statMax} value={hp} type={Type.fire} />

      <div
        className="b tl"
        title={hasRoomForFullText ? "" : t("pokedex.stats.attackLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.attackLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.attackLong")
          : t("pokedex.stats.attack")}
      </div>
      <div className="tr">{attack}</div>
      <StatBar max={statMax} value={attack} type={Type.fighting} />

      <div
        className="b tl"
        title={hasRoomForFullText ? "" : t("pokedex.stats.defenseLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.defenseLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.defenseLong")
          : t("pokedex.stats.defense")}
      </div>
      <div className="tr">{defense}</div>
      <StatBar max={statMax} value={defense} type={Type.electric} />

      <div
        className="b tl"
        title={hasRoomForFullText ? "" : t("pokedex.stats.specialAttackLong")}
        aria-label={
          hasRoomForFullText ? "" : t("pokedex.stats.specialAttackLong")
        }
      >
        {hasRoomForFullText
          ? t("pokedex.stats.specialAttackLong")
          : t("pokedex.stats.specialAttack")}
      </div>
      <div className="tr">{spAttack}</div>
      <StatBar max={statMax} value={spAttack} type={Type.grass} />

      <div
        className="b tl"
        title={hasRoomForFullText ? "" : t("pokedex.stats.specialDefenseLong")}
        aria-label={
          hasRoomForFullText ? "" : t("pokedex.stats.specialDefenseLong")
        }
      >
        {hasRoomForFullText
          ? t("pokedex.stats.specialDefenseLong")
          : t("pokedex.stats.specialDefense")}
      </div>
      <div className="tr">{spDefense}</div>
      <StatBar max={statMax} value={spDefense} type={Type.water} />

      <div
        className="b tl"
        title={hasRoomForFullText ? "" : t("pokedex.stats.speedLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.speedLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.speedLong")
          : t("pokedex.stats.speed")}
      </div>
      <div className="tr">{speed}</div>
      <StatBar max={statMax} value={speed} type={Type.fairy} />

      <div
        className="b tl"
        title={hasRoomForFullText ? "" : t("pokedex.stats.totalLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.totalLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.totalLong")
          : t("pokedex.stats.total")}
      </div>
      <div className="tr" style={{ height: 26 }}>
        {hp + attack + defense + spAttack + spDefense + speed}
      </div>
      <div />
    </div>
  );
}
