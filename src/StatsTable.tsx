import * as React from "react";
import { useTranslation } from "react-i18next";
import { Pokemon, Type } from "./data";
import StatBar from "./StatBar";

const STAT_MAX = 255;

export interface StatsTableProps {
  pokemon: Pokemon;
}

export default function StatsTable({ pokemon }: StatsTableProps) {
  const { hp, attack, defense, spAttack, spDefense, speed } = pokemon;
  const { t } = useTranslation();
  return (
    <div className="StatsTable tabular-nums">
      <div className="b tl" aria-description={t("pokedex.stats.hpLong")}>
        {t("pokedex.stats.hp")}
      </div>
      <div className="tr ph2">{hp}</div>
      <StatBar max={STAT_MAX} value={hp} type={Type.FIGHTING} />

      <div className="b tl" aria-description={t("pokedex.stats.attackLong")}>
        {t("pokedex.stats.attack")}
      </div>
      <div className="tr ph2">{attack}</div>
      <StatBar max={STAT_MAX} value={attack} type={Type.FIRE} />

      <div className="b tl" aria-description={t("pokedex.stats.defenseLong")}>
        {t("pokedex.stats.defense")}
      </div>
      <div className="tr ph2">{defense}</div>
      <StatBar max={STAT_MAX} value={defense} type={Type.ELECTRIC} />

      <div
        className="b tl"
        aria-description={t("pokedex.stats.specialAttackLong")}
      >
        {t("pokedex.stats.specialAttack")}
      </div>
      <div className="tr ph2">{spAttack}</div>
      <StatBar max={STAT_MAX} value={spAttack} type={Type.GRASS} />

      <div
        className="b tl"
        aria-description={t("pokedex.stats.specialDefenseLong")}
      >
        {t("pokedex.stats.specialDefense")}
      </div>
      <div className="tr ph2">{spDefense}</div>
      <StatBar max={STAT_MAX} value={spDefense} type={Type.WATER} />

      <div className="b tl" aria-description={t("pokedex.stats.speedLong")}>
        {t("pokedex.stats.speed")}
      </div>
      <div className="tr ph2">{speed}</div>
      <StatBar max={STAT_MAX} value={speed} type={Type.FAIRY} />

      <div className="b tl" aria-description={t("pokedex.stats.totalLong")}>
        {t("pokedex.stats.total")}
      </div>
      <div className="tr ph2" style={{ height: 26 }}>
        {hp + attack + defense + spAttack + spDefense + speed}
      </div>
      <div />
    </div>
  );
}
