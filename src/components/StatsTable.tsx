import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { Pokemon, Type } from "../misc/data-types";
import { Meter } from "./Meter";
import styles from "./StatsTable.module.css";
import { typeColor } from "../misc/colors";
import { FancyText } from "./FancyText";

const statMax = 255;

export interface StatsTableProps {
  pokemon: Pokemon;
}

export function StatsTable({ pokemon }: StatsTableProps) {
  const { hp, attack, defense, spAttack, spDefense, speed } = pokemon;
  const total = hp + attack + defense + spAttack + spDefense + speed;
  const { t } = useTranslation();
  const hasRoomForFullText = useMediaQuery("(min-width: 640px)");
  return (
    <div className={styles.root}>
      <FancyText
        tag="div"
        fontWeight="medium"
        title={t("pokedex.stats.hpLong")}
        aria-label={t("pokedex.stats.hpLong")}
      >
        {t("pokedex.stats.hp")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {hp}
      </FancyText>
      <Meter max={statMax} value={hp} color={typeColor(Type.fire)} />

      <FancyText
        tag="div"
        fontWeight="medium"
        title={hasRoomForFullText ? "" : t("pokedex.stats.attackLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.attackLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.attackLong")
          : t("pokedex.stats.attack")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {attack}
      </FancyText>
      <Meter max={statMax} value={attack} color={typeColor(Type.fighting)} />

      <FancyText
        tag="div"
        fontWeight="medium"
        title={hasRoomForFullText ? "" : t("pokedex.stats.defenseLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.defenseLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.defenseLong")
          : t("pokedex.stats.defense")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {defense}
      </FancyText>
      <Meter max={statMax} value={defense} color={typeColor(Type.electric)} />

      <FancyText
        tag="div"
        fontWeight="medium"
        title={hasRoomForFullText ? "" : t("pokedex.stats.specialAttackLong")}
        aria-label={
          hasRoomForFullText ? "" : t("pokedex.stats.specialAttackLong")
        }
      >
        {hasRoomForFullText
          ? t("pokedex.stats.specialAttackLong")
          : t("pokedex.stats.specialAttack")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {spAttack}
      </FancyText>
      <Meter max={statMax} value={spAttack} color={typeColor(Type.grass)} />

      <FancyText
        tag="div"
        fontWeight="medium"
        title={hasRoomForFullText ? "" : t("pokedex.stats.specialDefenseLong")}
        aria-label={
          hasRoomForFullText ? "" : t("pokedex.stats.specialDefenseLong")
        }
      >
        {hasRoomForFullText
          ? t("pokedex.stats.specialDefenseLong")
          : t("pokedex.stats.specialDefense")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {spDefense}
      </FancyText>
      <Meter max={statMax} value={spDefense} color={typeColor(Type.water)} />

      <FancyText
        tag="div"
        title={hasRoomForFullText ? "" : t("pokedex.stats.speedLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.speedLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.speedLong")
          : t("pokedex.stats.speed")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {speed}
      </FancyText>
      <Meter max={statMax} value={speed} color={typeColor(Type.fairy)} />

      <FancyText
        tag="div"
        title={hasRoomForFullText ? "" : t("pokedex.stats.totalLong")}
        aria-label={hasRoomForFullText ? "" : t("pokedex.stats.totalLong")}
      >
        {hasRoomForFullText
          ? t("pokedex.stats.totalLong")
          : t("pokedex.stats.total")}
      </FancyText>
      <FancyText tag="div" textAlign="right">
        {total}
      </FancyText>
      <div />
    </div>
  );
}
