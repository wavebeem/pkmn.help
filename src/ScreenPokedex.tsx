import classNames from "classnames";
import { matchSorter } from "match-sorter";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Pokemon, Type, typesFromUserInput } from "./data-types";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { MonsterImage } from "./MonsterImage";
import { Paginator } from "./Paginator";
import { pickTranslation } from "./pickTranslation";
import { Search } from "./Search";
import { StatsTable } from "./StatsTable";
import { useComputedLanguage } from "./useComputedLanguage";
import { useSearch } from "./useSearch";
import { IconSparkles } from "./IconSparkles";
import styles from "./ScreenPokedex.module.css";
import Spinner from "./Spinner";
import { Badge } from "./Badge";
import { useSessionStorage, useDebounceValue } from "usehooks-ts";
import { CopyButton } from "./CopyButton";
import { IconMusic } from "./IconMusic";

const nbsp = "\u00a0";

function getWikiLink(lang: string, pkmn: Pokemon): string {
  function getName(lang: string) {
    return encodeURIComponent(
      pickTranslation(pkmn.speciesNames, lang).replace(/ /g, "_")
    );
  }
  switch (lang) {
    default:
    case "en":
      return `https://bulbapedia.bulbagarden.net/wiki/${getName(
        "en"
      )}_(Pokémon)`;
    case "de":
      return `https://www.pokewiki.de/${getName("de")}`;
    case "es":
      return `https://www.wikidex.net/wiki/${getName("es")}`;
    case "fr":
      return `https://www.pokepedia.fr/${getName("fr")}`;
    case "it":
      return `https://wiki.pokemoncentral.it/${getName("it")}`;
    case "ja":
      return `https://wiki.ポケモン.com/wiki/${getName("ja")}`;
    case "zh-Hans":
    case "zh-Hant":
      return `https://wiki.52poke.com/wiki/${getName("zt-Hans")}`;
    case "ko":
      return `https://namu.wiki/w/${getName("ko")}`;
  }
}

function getWikiName(lang: string): string {
  switch (lang) {
    default:
    case "en":
      return "Bulbapedia";
    case "de":
      return "PokéWiki";
    case "es":
      return "WikiDex";
    case "fr":
      return "Poképédia";
    case "it":
      return "Pokémon Central";
    case "ja":
      return "ポケモンWiki";
    case "zh-Hans":
    case "zh-Hant":
      return "神奇宝贝百科";
    case "ko":
      return "나무위키";
  }
}

interface MonsterProps {
  pokemon: Pokemon;
  setQuery: (query: string) => void;
}

function Monster({ pokemon, setQuery }: MonsterProps) {
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

interface ScreenPokedexProps {
  allPokemon: Pokemon[];
  isLoading: boolean;
}

export function ScreenPokedex({ allPokemon, isLoading }: ScreenPokedexProps) {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const search = useSearch();
  const [query, setQuery] = useSessionStorage("pokedex.query", "");
  const [debouncedQuery] = useDebounceValue(query, 250);
  const [page, setPage] = useSessionStorage<number>("pokedex.page", 0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (search.has("q")) {
      setQuery(search.get("q") || "");
    }
    if (search.has("page")) {
      setPage(Number(search.get("page") || 1) - 1);
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  const searchablePkmn = React.useMemo(() => {
    return allPokemon.map((p) => {
      return {
        ...p,
        speciesName: pickTranslation(p.speciesNames, language),
        formName: pickTranslation(p.formNames, language),
      };
    });
  }, [allPokemon, language]);

  const pkmn = React.useMemo(() => {
    const s = debouncedQuery.trim().toLocaleLowerCase();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return searchablePkmn.filter((p) => p.number === number);
    }
    // The return value of `t` depends on the current value of `language`, but
    // the rules of hooks can't realize these. Pretend to use `language` here to
    // make it happy.
    language;
    const types = typesFromUserInput({ types: s, t, strict: true });
    if (types.length > 0) {
      return searchablePkmn.filter((p) => {
        if (types.length === 1) {
          return p.types[0] === types[0] || p.types[1] === types[0];
        }
        if (types.length === 2 && types[1] === Type.none) {
          return p.types.length === 1 && p.types[0] === types[0];
        }
        return (
          p.types.slice().sort().join(" ") === types.slice().sort().join(" ")
        );
      });
    }
    if (!s) {
      return searchablePkmn;
    }
    return matchSorter(searchablePkmn, s, {
      keys: ["speciesName", "formName", "number"],
    });
  }, [debouncedQuery, searchablePkmn, language, t]);

  const permalink = new URL(window.location.href);
  {
    const newQuery = query.trim();
    if (newQuery) {
      permalink.searchParams.set("q", newQuery);
    }
    if (Number(page) > 0) {
      permalink.searchParams.set("page", String(page + 1));
    }
  }

  return (
    <main className="ph3 mt3 center content-narrow">
      <div className="pt2" />
      <Search
        search={query}
        updateSearch={(newQuery) => {
          setQuery(newQuery);
          setPage(0);
        }}
      />
      <div className="flex justify-between ph2 nt2 pb3 bb border3 f6">
        <span className="fg3" aria-hidden="true">
          {t("pokedex.search.description")}
        </span>
        <Link
          to="/pokedex/help/"
          className="br1 underline fg-link focus-outline ml3 flex-none"
          aria-label={t("pokedex.search.helpLong")}
        >
          {t("pokedex.search.help")}
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Paginator
          currentPage={Number(page)}
          setPage={setPage}
          pageSize={20}
          emptyState={
            <p className="fg4 f4 tc m0">{t("pokedex.search.notFound")}</p>
          }
          items={pkmn}
          renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
          renderPage={(page) =>
            page.map((pokemon) => (
              <Monster
                key={pokemon.id}
                pokemon={pokemon}
                setQuery={(query) => {
                  setQuery(query);
                  setPage(0);
                }}
              />
            ))
          }
        />
      )}
      <div className="pt2 pb4">
        <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
      </div>
    </main>
  );
}
