import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "./components/Badge";
import { IconMusic } from "./IconMusic";
import { IconSparkles } from "./IconSparkles";
import { MonsterImage } from "./MonsterImage";
import { nbsp } from "./ScreenPokedex";
import { getWikiLink, getWikiName } from "./wiki";
import styles from "./ScreenPokedex.module.css";
import { StatsTable } from "./StatsTable";
import { Pokemon } from "./data-types";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { useComputedLanguage } from "./useComputedLanguage";

export interface MonsterProps {
  pokemon: Pokemon;
  setQuery: (query: string) => void;
}

export function Monster({ pokemon, setQuery }: MonsterProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { t, i18n } = useTranslation();
  const language = useComputedLanguage();
  const [shiny, setShiny] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const displayNumber = formatMonsterNumber(pokemon.number);
  const params = new URLSearchParams({
    types: pokemon.types.join(" "),
    ability: "none",
    tera_type: "none",
  });
  const speciesName = pokemon.speciesNames[language] || pokemon.speciesNames.en;
  const formName = pokemon.formNames[language] || pokemon.formNames.en;
  const formattedFormName = formName ? `(${formName})` : nbsp;
  const idPrefix = `pokemon-${pokemon.id}`;
  const monsterParams = new URLSearchParams();
  monsterParams.set("q", String(pokemon.number));
  return (
    <div
      className={classNames(
        "fg1 mv3",
        "flex flex-column items-stretch",
        "relative",
        "pa3 br3 bg1 ba border2 button-shadow"
      )}
    >
      <div className="flex flex flex-column flex-row-ns items-center-ns gap2">
        <div className="flex items-center gap2">
          <div className="fg3 mv0 tabular-nums f5">{displayNumber}</div>
          <h2
            className="mv0 f4 flex-auto weight-medium"
            id={`${idPrefix}-name`}
          >
            <Link
              to={{ search: monsterParams.toString() }}
              onClick={(event) => {
                event.preventDefault();
                setQuery(String(pokemon.number));
              }}
              className="br1 no-underline fg-link focus-outline"
            >
              {speciesName}
            </Link>
          </h2>
        </div>
        <div className="nv2 fg3 f5" id={`${idPrefix}-form`}>
          {formattedFormName}
        </div>
        <div className={styles.buttonContainer}>
          <audio
            ref={audioRef}
            preload="none"
            aria-hidden="true"
            hidden={true}
            autoPlay={false}
            onPlay={() => {
              setIsPlaying(true);
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
            <button
              className={classNames(
                "br-pill ba pa2 flex select-none gap1 items-center fill-currentcolor",
                styles.iconButton,
                "button-shadow"
              )}
              title={t("pokedex.cry.text")}
              aria-label={t("pokedex.cry.text")}
              aria-pressed={isPlaying ? "true" : "false"}
              aria-disabled={isPlaying ? "true" : "false"}
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
              <IconMusic />
            </button>
          )}
          {pokemon.hasShiny && (
            <button
              className={classNames(
                "br-pill ba pa2 flex select-none gap1 items-center fill-currentcolor",
                styles.iconButton,
                "button-shadow"
              )}
              title={t("pokedex.shiny.text")}
              aria-label={t("pokedex.shiny.text")}
              aria-pressed={shiny ? "true" : "false"}
              onClick={() => {
                setShiny(!shiny);
              }}
            >
              <IconSparkles />
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.monster} gap3`}>
        <div className={`${styles.monsterIcon} flex flex-column`}>
          <div className="flex flex-column">
            <div className="pv3 flex justify-center">
              <MonsterImage pokemonID={pokemon.id} shiny={shiny} />
            </div>
            <div className="flex flex-wrap gap1 justify-center items-start">
              {pokemon.types.map((t, i) => (
                <Badge key={i} type={t} />
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.monsterLinks} flex flex-wrap gap3`}>
          <a
            aria-labelledby={`${idPrefix}-wiki ${idPrefix}-name ${idPrefix}-form`}
            className="br1 underline fg-link focus-outline"
            href={getWikiLink(i18n.language, pokemon)}
            id={`${idPrefix}-wiki`}
          >
            {getWikiName(i18n.language)}
          </a>
          <Link
            aria-labelledby={`${idPrefix}-offense ${idPrefix}-name ${idPrefix}-form`}
            className="br1 underline fg-link focus-outline"
            to={`/offense/?${params}#matchup-offense`}
            id={`${idPrefix}-offense`}
          >
            {t("pokedex.offense.text")}
          </Link>
          <Link
            aria-labelledby={`${idPrefix}-defense ${idPrefix}-name ${idPrefix}-form`}
            className="br1 underline fg-link focus-outline"
            to={`/defense/?${params}#matchup-defense`}
            id={`${idPrefix}-defense`}
          >
            {t("pokedex.defense.text")}
          </Link>
        </div>
        <div
          className={`${styles.monsterStats} flex flex-column justify-center flex-auto gap3`}
        >
          <StatsTable pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
