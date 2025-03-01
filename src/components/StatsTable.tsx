import { useTranslation } from "react-i18next";
import { Pokemon, Type } from "../misc/data-types";
import { Meter } from "./Meter";
import styles from "./StatsTable.module.css";
import { typeColor, typeColorAlpha } from "../misc/colors";
import { FancyText } from "./FancyText";
import { ReactNode } from "react";

const statMax = 255;

export interface StatsTableProps {
  pokemon: Pokemon;
}

export function StatsTable({ pokemon }: StatsTableProps): ReactNode {
  const { hp, attack, defense, spAttack, spDefense, speed } = pokemon;
  const total = hp + attack + defense + spAttack + spDefense + speed;
  const { t } = useTranslation();
  const alpha = 10;
  return (
    <div className={styles.root}>
      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.hpLong")}
        aria-label={t("pokedex.stats.hpLong")}
      >
        {t("pokedex.stats.hp")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {hp}
      </FancyText>
      <Meter
        max={statMax}
        value={hp}
        color={typeColor(Type.fire)}
        background={typeColorAlpha(Type.fire, alpha)}
      />

      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.attackLong")}
        aria-label={t("pokedex.stats.attackLong")}
      >
        {t("pokedex.stats.attack")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {attack}
      </FancyText>
      <Meter
        max={statMax}
        value={attack}
        color={typeColor(Type.fighting)}
        background={typeColorAlpha(Type.fighting, alpha)}
      />

      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.defenseLong")}
        aria-label={t("pokedex.stats.defenseLong")}
      >
        {t("pokedex.stats.defense")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {defense}
      </FancyText>
      <Meter
        max={statMax}
        value={defense}
        color={typeColor(Type.electric)}
        background={typeColorAlpha(Type.electric, alpha)}
      />

      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.specialAttackLong")}
        aria-label={t("pokedex.stats.specialAttackLong")}
      >
        {t("pokedex.stats.specialAttack")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {spAttack}
      </FancyText>
      <Meter
        max={statMax}
        value={spAttack}
        color={typeColor(Type.grass)}
        background={typeColorAlpha(Type.grass, alpha)}
      />

      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.specialDefenseLong")}
        aria-label={t("pokedex.stats.specialDefenseLong")}
      >
        {t("pokedex.stats.specialDefense")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {spDefense}
      </FancyText>
      <Meter
        max={statMax}
        value={spDefense}
        color={typeColor(Type.water)}
        background={typeColorAlpha(Type.water, alpha)}
      />

      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.speedLong")}
        aria-label={t("pokedex.stats.speedLong")}
      >
        {t("pokedex.stats.speed")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {speed}
      </FancyText>
      <Meter
        max={statMax}
        value={speed}
        color={typeColor(Type.fairy)}
        background={typeColorAlpha(Type.fairy, alpha)}
      />

      <FancyText
        tag="div"
        fontSize="small"
        title={t("pokedex.stats.totalLong")}
        aria-label={t("pokedex.stats.totalLong")}
      >
        {t("pokedex.stats.total")}
      </FancyText>
      <FancyText
        tag="div"
        textAlign="right"
        fontWeight="medium"
        fontSize="small"
      >
        {total}
      </FancyText>
      <div />
    </div>
  );
}
