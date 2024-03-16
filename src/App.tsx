import classNames from "classnames";
import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import { CoverageType, Pokemon } from "./data-types";
import { detectLanguage } from "./detectLanguage";
import { formatPokemonName } from "./formatPokemonName";
import { MonsterImage } from "./MonsterImage";
import { ScreenCoverageList } from "./ScreenCoverageList";
import { ScreenDefense } from "./ScreenDefense";
import { ScreenMore } from "./ScreenMore";
import { ScreenOffense } from "./ScreenOffense";
import { ScreenPokedex } from "./ScreenPokedex";
import { ScreenPokedexHelp } from "./ScreenPokedexHelp";
import { ScreenWeaknessCoverage } from "./ScreenWeaknessCoverage";
import { publicPath } from "./settings";
import { useFetchJSON } from "./useFetchJSON";
import { useGeneration } from "./useGeneration";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useUpdateSW } from "./useUpdateSW";
import styles from "./App.module.css";
import Spinner from "./Spinner";

const tabClass = classNames([
  "no-underline",
  "pv1 ph3 f5",
  "focus-tab",
  "tc b",
  "ba border1 br-pill",
  "bg1 fg1",
]);

const tabClassActive = classNames(["button-selected"]);

function getTabClass({ isActive }: { isActive: boolean }): string {
  return classNames(tabClass, isActive && tabClassActive);
}

function getFallback(key: string): string {
  if (key === "title") {
    return "Pokémon Type Calculator";
  }
  return "…";
}

function useTranslationsWithBlankFallback() {
  const { t: translation, ready } = useTranslation(undefined, {
    useSuspense: false,
  });
  return ready ? translation : getFallback;
}

export function App() {
  // Service worker
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    // offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();
  useUpdateSW();
  // TODO: Fix this CSV download when using SW in Firefox

  async function updateApp() {
    setNeedRefresh(false);
    await updateServiceWorker(true);
  }

  const t = useTranslationsWithBlankFallback();
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  // State...
  const [generation] = useGeneration();
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);
  const [easterEgg, setEasterEgg] = React.useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = React.useState("");

  const [language] = useLanguage();

  React.useEffect(() => {
    async function load() {
      await i18n.changeLanguage(language || detectLanguage());
      document.documentElement.lang = i18n.language;
    }
    load();
  }, [language, i18n]);

  // Theme stuff
  const [theme] = useTheme();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDark = theme === "dark" || (theme === "auto" && isDarkMode);
  const themeColor = isDark ? "hsl(357, 70%, 40%)" : "hsl(357, 97%, 46%)";
  const themeAuto = isDark ? "dark" : "light";

  // Load Pokédex JSON
  const jsonURL = new URL("data-pkmn.json", publicPath).href;
  const allPokemonResponse = useFetchJSON<Pokemon[]>(jsonURL);

  // Fallback coverage types
  React.useEffect(() => {
    if (allPokemonResponse.type !== "done") {
      return;
    }
    const allPokemon = allPokemonResponse.data;
    const fallbackCoverageTypes = allPokemon.map<CoverageType>((pkmn) => {
      const name = formatPokemonName({
        speciesName: pkmn.speciesNames[language] || pkmn.speciesNames.en,
        formName: pkmn.formNames[language] || pkmn.formNames.en,
      });
      const number = String(pkmn.number);
      const types = pkmn.types;
      return { number, name, types };
    });
    setIsLoading(false);
    setCoverageTypes(fallbackCoverageTypes);
    setFallbackCoverageTypes(fallbackCoverageTypes);
    setAllPokemon(allPokemon);
  }, [allPokemonResponse, language]);

  return (
    <HelmetProvider>
      <div className="flex-auto">
        <Helmet>
          <html data-theme={themeAuto} />
          <meta name="theme-color" content={themeColor} />
          <title>{t("title")}</title>
        </Helmet>
        <h1 className={`f3-ns f4 tc relative white ${styles.header}`}>
          <Link to="/" className="no-underline white focus-outline br1">
            {t("title")}
          </Link>
          <div
            className={styles.headerButton}
            onClick={(event) => {
              event.preventDefault();
              const i = Math.floor(Math.random() * AllPokemon.length);
              const pkmn = AllPokemon[i];
              if (!pkmn) return;
              setEasterEgg(pkmn);
            }}
          />
          {easterEgg && (
            <div
              className={styles.easterEgg}
              data-animate={easterEggLoadedID === easterEgg.id}
            >
              <MonsterImage
                pokemonID={easterEgg.id}
                imageType={easterEgg.imageType}
                onLoad={({ pokemonID }) => {
                  setEasterEggLoadedID(pokemonID);
                }}
                scale={2}
              />
            </div>
          )}
        </h1>
        <nav className={`bg1 bb border2 ${styles.tabBar} pb2 ph2`}>
          <NavLink className={getTabClass} to={`/offense/${offenseParams}`}>
            {t("navigation.offense")}
          </NavLink>
          <NavLink className={getTabClass} to={`/defense/${defenseParams}`}>
            {t("navigation.defense")}
          </NavLink>
          <NavLink className={getTabClass} to={`/pokedex/${pokedexParams}`}>
            {t("navigation.pokedex")}
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return classNames(
                getTabClass({ isActive }),
                needRefresh && styles.pleaseUpdate
              );
            }}
            to="/more/"
          >
            {t("navigation.more")}
          </NavLink>
        </nav>
        <React.Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/offense/coverage/weakness/"
              element={
                <ScreenCoverageList
                  mode="weakness"
                  generation={generation}
                  coverageTypes={coverageTypes}
                />
              }
            />
            <Route
              path="/offense/coverage/resistance/"
              element={
                <ScreenCoverageList
                  mode="resistance"
                  generation={generation}
                  coverageTypes={coverageTypes}
                />
              }
            />
            <Route
              path="/offense/coverage/normal/"
              element={
                <ScreenCoverageList
                  mode="normal"
                  generation={generation}
                  coverageTypes={coverageTypes}
                />
              }
            />
            <Route
              path="/offense/coverage/"
              element={
                <ScreenWeaknessCoverage
                  setCoverageTypes={setCoverageTypes}
                  offenseParams={offenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/offense/"
              element={
                <ScreenOffense
                  generation={generation}
                  coverageTypes={coverageTypes}
                  setOffenseParams={setOffenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/defense/"
              element={
                <ScreenDefense
                  generation={generation}
                  setDefenseParams={setDefenseParams}
                />
              }
            />
            <Route
              path="/pokedex/help/"
              element={<ScreenPokedexHelp pokedexParams={pokedexParams} />}
            />
            <Route
              path="/pokedex/"
              element={
                <ScreenPokedex
                  setPokedexParams={setPokedexParams}
                  allPokemon={AllPokemon}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/more/"
              element={
                <ScreenMore
                  needsAppUpdate={needRefresh}
                  updateApp={updateApp}
                />
              }
            />
            <Route path="/*" element={<Navigate to="/defense/" />} />
          </Routes>
        </React.Suspense>
      </div>
    </HelmetProvider>
  );
}
