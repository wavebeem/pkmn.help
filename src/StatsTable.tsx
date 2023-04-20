import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { Pokemon, Type } from "./data-types";
import { Meter } from "./Meter";
import styles from "./StatsTable.module.css";
import { typeColor } from "./colors";

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
      <Meter max={statMax} value={hp} color={typeColor(Type.fire)} />

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
      <Meter max={statMax} value={attack} color={typeColor(Type.fighting)} />

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
      <Meter max={statMax} value={defense} color={typeColor(Type.electric)} />

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
      <Meter max={statMax} value={spAttack} color={typeColor(Type.grass)} />

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
      <Meter max={statMax} value={spDefense} color={typeColor(Type.water)} />

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
      <Meter max={statMax} value={speed} color={typeColor(Type.fairy)} />

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
