import classNames from "classnames";
import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import styles from "./App.module.css";
import { MonsterImage } from "./MonsterImage";
import { ScreenCoverageList } from "./ScreenCoverageList";
import { ScreenDefense } from "./ScreenDefense";
import { ScreenDefenseTeam } from "./ScreenDefenseTeam";
import { ScreenMore } from "./ScreenMore";
import { ScreenOffense } from "./ScreenOffense";
import { ScreenPokedex } from "./ScreenPokedex";
import { ScreenPokedexHelp } from "./ScreenPokedexHelp";
import { ScreenWeaknessCoverage } from "./ScreenWeaknessCoverage";
import Spinner from "./components/Spinner";
import { CoverageType, Pokemon } from "./data-types";
import { detectLanguage } from "./detectLanguage";
import { formatPokemonName } from "./formatPokemonName";
import { iterCycle, iterNext, iterStutter } from "./iter";
import { randomItem } from "./random";
import { publicPath } from "./settings";
import { useFetchJSON } from "./hooks/useFetchJSON";
import { useGeneration } from "./hooks/useGeneration";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import { useUpdateSW } from "./hooks/useUpdateSW";

const tabClass = classNames([
  "active-darken",
  "no-underline",
  "pv1 ph3 f5",
  "focus-tab",
  "weight-medium",
  "tc",
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

const pokeballThemes = ["premier", "regular"] as const;
type PokeballTheme = typeof pokeballThemes[number];

const pokeballThemeCycle = iterStutter(iterCycle(pokeballThemes), 2);

export function App() {
  // Service worker
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    // offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();
  useUpdateSW();

  async function updateApp() {
    setNeedRefresh(false);
    await updateServiceWorker(true);
    location.reload();
  }

  const t = useTranslationsWithBlankFallback();
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  // State...
  const [generation] = useGeneration();
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);
  const [easterEgg, setEasterEgg] = React.useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = React.useState("");
  const [pokeballTheme, setPokeballTheme] =
    React.useState<PokeballTheme>("premier");

  React.useEffect(() => {
    setPokeballTheme(iterNext(pokeballThemeCycle));
  }, []);

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
  const themeColor = isDark ? "hsl(0, 70%, 40%)" : "hsl(0, 90%, 45%)";
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
      {easterEgg && (
        <div
          className={styles.easterEgg}
          data-animate={easterEggLoadedID === easterEgg.id}
        >
          <MonsterImage
            pokemonID={easterEgg.id}
            onLoad={({ pokemonID }) => {
              setEasterEggLoadedID(pokemonID);
            }}
          />
        </div>
      )}
      <div className="flex-auto">
        <Helmet>
          <html data-theme={themeAuto} />
          <meta name="theme-color" content={themeColor} />
          <title>{t("title")}</title>
        </Helmet>
        <h1
          className={classNames(
            `f3-ns f4 weight-medium`,
            `flex items-center justify-center gap2`,
            "pa3",
            "bb ma0",
            "bg-poke white border-vibrant",
            styles.header
          )}
        >
          <button
            className={styles.headerButton}
            data-theme={pokeballTheme}
            aria-hidden={true}
            onClick={(event) => {
              event.preventDefault();
              const pkmn = randomItem(AllPokemon);
              if (!pkmn) {
                return;
              }
              setEasterEgg(pkmn);
              setPokeballTheme(iterNext(pokeballThemeCycle));
            }}
          />
          <div>{t("title")}</div>
        </h1>
        <nav
          className={classNames(`bg1 bb border2 pv2 ph2 gap2`, styles.tabBar)}
        >
          <NavLink className={getTabClass} to="/offense/">
            {t("navigation.offense")}
          </NavLink>
          <NavLink className={getTabClass} to="/defense/">
            {t("navigation.defense")}
          </NavLink>
          <NavLink className={getTabClass} to="/pokedex/">
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
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/defense/"
              element={<ScreenDefense generation={generation} />}
            />
            <Route
              path="/defense/team/"
              element={<ScreenDefenseTeam generation={generation} />}
            />
            <Route
              path="/defense/"
              element={<ScreenDefense generation={generation} />}
            />
            <Route path="/pokedex/help/" element={<ScreenPokedexHelp />} />
            <Route
              path="/pokedex/"
              element={
                <ScreenPokedex allPokemon={AllPokemon} isLoading={isLoading} />
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
