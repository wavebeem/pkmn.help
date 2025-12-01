import { ReactNode, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useComputedLanguage } from "../hooks/useComputedLanguage";
import { Pokemon } from "../misc/data-types";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import { getWikiLink, getWikiName } from "../misc/wiki";
import { Badge } from "./Badge";
import { ExternalLink } from "./ExternalLink";
import { FancyLink } from "./FancyLink";
import { FancyText } from "./FancyText";
import { Flex } from "./Flex";
import { IconCry, IconShiny } from "./Icon";
import { IconButton } from "./IconButton";
import styles from "./Monster.module.css";
import { MonsterImage } from "./MonsterImage";
import { StatsTable } from "./StatsTable";

export type MonsterProps = {
  pokemon: Pokemon;
  setQuery: (query: string) => void;
};

export function Monster({ pokemon, setQuery }: MonsterProps): ReactNode {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t, i18n } = useTranslation();
  const language = useComputedLanguage();
  const [shiny, setShiny] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationState, setAnimationState] = useState<0 | 1 | 2>(0);
  const displayNumber = formatMonsterNumber(pokemon.number);
  const params = new URLSearchParams({
    types: pokemon.types.join(" "),
    ability: "none",
    tera_type: "none",
  });
  const speciesName = pokemon.speciesNames[language] || pokemon.speciesNames.en;
  const formName = pokemon.formNames[language] || pokemon.formNames.en;
  const idPrefix = `pokemon-${pokemon.id}`;
  const monsterParams = new URLSearchParams({ q: String(pokemon.number) });
  function animate() {
    setAnimationState(animationState === 1 ? 2 : 1);
  }
  return (
    <div className={styles.root}>
      <Flex direction="column">
        <Flex align="center" gap="medium">
          <FancyText
            tag="h2"
            id={`${idPrefix}-name`}
            fontSize="xlarge"
            fontWeight="medium"
          >
            {speciesName}
          </FancyText>
        </Flex>
        <Flex gap="medium">
          <FancyText tag="div" tabularNums color="3">
            <FancyLink
              to={{ search: monsterParams.toString() }}
              underline="never"
              onClick={(event) => {
                event.preventDefault();
                setQuery(String(pokemon.number));
              }}
            >
              {displayNumber}
            </FancyLink>
          </FancyText>
          <FancyText tag="div" color="2" id={`${idPrefix}-form`}>
            {formName}
          </FancyText>
        </Flex>
        <div className={styles.buttonContainer}>
          <audio
            ref={audioRef}
            preload="none"
            aria-hidden="true"
            hidden={true}
            autoPlay={false}
            onPlay={() => {
              setIsPlaying(true);
              animate();
            }}
            onEnded={() => {
              setIsPlaying(false);
            }}
            onError={() => {
              setIsPlaying(false);
            }}
          >
            <source src={`/cry/${pokemon.id}.ogg`} type="audio/ogg" />
            <source src={`/cry/${pokemon.id}.m4a`} type="audio/mp4" />
            <source src={`/cry/${pokemon.id}.aac`} type="audio/aac" />
          </audio>
          {pokemon.hasCry && (
            <IconButton
              title={t("pokedex.cry.text")}
              aria-label={t("pokedex.cry.text")}
              aria-pressed={isPlaying}
              aria-disabled={isPlaying}
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) {
                  return;
                }
                if (audio.paused) {
                  audio.play();
                }
              }}
            >
              <IconCry size={16} />
            </IconButton>
          )}
          {pokemon.hasShiny && (
            <IconButton
              title={t("pokedex.shiny.text")}
              aria-label={t("pokedex.shiny.text")}
              aria-pressed={shiny}
              onClick={() => {
                setShiny(!shiny);
                animate();
              }}
            >
              <IconShiny size={16} />
            </IconButton>
          )}
        </div>
      </Flex>
      <div className={styles.monster}>
        <div className={styles.monsterIcon}>
          <Flex direction="column">
            <Flex paddingY="large" justify="center">
              <MonsterImage
                pokemonID={pokemon.id}
                shiny={shiny}
                animationState={animationState}
              />
            </Flex>
            <Flex wrap gap="small" justify="flex-start" align="flex-start">
              {pokemon.types.map((t, i) => (
                <Badge key={i} type={t} size="small" />
              ))}
            </Flex>
          </Flex>
        </div>
        <div className={styles.monsterLinks}>
          <ExternalLink
            aria-labelledby={`${idPrefix}-wiki ${idPrefix}-name ${idPrefix}-form`}
            href={getWikiLink(i18n.language, pokemon)}
            id={`${idPrefix}-wiki`}
          >
            {getWikiName(i18n.language)}
          </ExternalLink>
          <FancyLink
            aria-labelledby={`${idPrefix}-offense ${idPrefix}-name ${idPrefix}-form`}
            to={`/offense/combination/?${params}#matchup-offense`}
            id={`${idPrefix}-offense`}
          >
            {t("pokedex.offense.text")}
          </FancyLink>
          <FancyLink
            aria-labelledby={`${idPrefix}-defense ${idPrefix}-name ${idPrefix}-form`}
            to={`/defense/solo/?${params}#matchup-defense`}
            id={`${idPrefix}-defense`}
          >
            {t("pokedex.defense.text")}
          </FancyLink>
        </div>
        <div className={styles.monsterStats}>
          <StatsTable pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
