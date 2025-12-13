import { ReactNode, KeyboardEvent } from "react";
import { useComputedLanguage } from "../hooks/useComputedLanguage";
import { Pokemon } from "../misc/data-types";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import { Badge } from "./Badge";
import { FancyText } from "./FancyText";
import { Flex } from "./Flex";
import styles from "./MonsterCard.module.css";
import { MonsterImage } from "./MonsterImage";

export type MonsterCardProps = {
  pokemon: Pokemon;
  onClick?: () => void;
};

export function MonsterCard({
  pokemon,
  onClick,
}: MonsterCardProps): ReactNode {
  const language = useComputedLanguage();
  const displayNumber = formatMonsterNumber(pokemon.number);
  const speciesName =
    pokemon.speciesNames[language] || pokemon.speciesNames.en;
  const formName = pokemon.formNames[language] || pokemon.formNames.en;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={styles.root}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${speciesName}${formName ? ` - ${formName}` : ""} - ${displayNumber}`}
    >
      <Flex direction="column" gap="small" align="center">
        <FancyText tag="div" tabularNums color="3" fontSize="small">
          {displayNumber}
        </FancyText>
        <FancyText
          tag="h3"
          fontSize="medium"
          fontWeight="medium"
          className={styles.name}
        >
          {speciesName}
        </FancyText>
        {formName && (
          <FancyText tag="div" color="2" fontSize="small">
            {formName}
          </FancyText>
        )}
        <div className={styles.imageContainer}>
          <MonsterImage pokemonID={pokemon.id} scale={0.3} />
        </div>
        <Flex wrap gap="small" justify="center">
          {pokemon.types.map((type, i) => (
            <Badge key={i} type={type} size="small" />
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

