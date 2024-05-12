import classNames from "classnames";
import { useState, useEffect, Suspense, ReactNode, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import styles from "./App.module.css";
import { MonsterImage } from "./MonsterImage";
import { ScreenCoverageList } from "../screens/ScreenCoverageList";
import { ScreenDefense } from "../screens/ScreenDefense";
import { ScreenDefenseTeam } from "../screens/ScreenDefenseTeam";
import { ScreenMore } from "../screens/ScreenMore";
import { ScreenOffense } from "../screens/ScreenOffense";
import { ScreenPokedex } from "../screens/ScreenPokedex";
import { ScreenPokedexHelp } from "../screens/ScreenPokedexHelp";
import { ScreenWeaknessCoverage } from "../screens/ScreenWeaknessCoverage";
import { Spinner } from "./Spinner";
import { CoverageType, Pokemon } from "../misc/data-types";
import { detectLanguage } from "../misc/detectLanguage";
import { formatPokemonName } from "../misc/formatPokemonName";
import { iterCycle, iterNext, iterStutter } from "../misc/iter";
import { randomItem } from "../misc/random";
import { publicPath } from "../misc/settings";
import { useFetchJSON } from "../hooks/useFetchJSON";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useUpdateSW } from "../hooks/useUpdateSW";
import { ScreenError } from "../screens/ScreenError";
import { AppContext, AppContextProvider } from "../hooks/useAppContext";

const exampleError = new Error("Example error for testing the error screen");

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

export function App(): ReactNode {
  const tabClass = classNames(styles.tab, "active-darken focus-tab");

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
  const [isLoading, setIsLoading] = useState(true);
  const [coverageTypes, setCoverageTypes] = useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [easterEgg, setEasterEgg] = useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = useState("");
  const [pokeballTheme, setPokeballTheme] = useState<PokeballTheme>("premier");

  useEffect(() => {
    setPokeballTheme(iterNext(pokeballThemeCycle));
  }, []);

  const [language] = useLanguage();

  useEffect(() => {
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
  useEffect(() => {
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

  const appContext = useMemo<AppContext>(
    () => ({
      allPokemon: AllPokemon,
      coverageTypes,
      easterEggLoadedID,
      easterEggPokemon: easterEgg,
      fallbackCoverageTypes,
      isLoading,
      needsAppUpdate: needRefresh,
      pokeballTheme,
      setCoverageTypes,
      updateApp,
    }),
    [
      AllPokemon,
      coverageTypes,
      easterEgg,
      easterEggLoadedID,
      fallbackCoverageTypes,
      isLoading,
      needRefresh,
      pokeballTheme,
      setCoverageTypes,
      updateApp,
    ]
  );

  return (
    <AppContextProvider value={appContext}>
      <HelmetProvider>
        <Helmet>
          <html data-theme={themeAuto} />
          <meta name="theme-color" content={themeColor} />
          <title>{t("title")}</title>
        </Helmet>
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
        <div className={styles.root}>
          <h1 className={styles.header}>
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
          <nav className={styles.tabBar}>
            <NavLink className={tabClass} to="/offense/">
              {t("navigation.offense")}
            </NavLink>
            <NavLink className={tabClass} to="/defense/">
              {t("navigation.defense")}
            </NavLink>
            <NavLink className={tabClass} to="/pokedex/">
              {t("navigation.pokedex")}
            </NavLink>
            <NavLink
              className={classNames(
                tabClass,
                needRefresh && styles.pleaseUpdate
              )}
              to="/more/"
            >
              {t("navigation.more")}
            </NavLink>
          </nav>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/offense/coverage/weakness/"
                element={<ScreenCoverageList mode="weakness" />}
              />
              <Route
                path="/offense/coverage/resistance/"
                element={<ScreenCoverageList mode="resistance" />}
              />
              <Route
                path="/offense/coverage/normal/"
                element={<ScreenCoverageList mode="normal" />}
              />
              <Route
                path="/offense/coverage/"
                element={<ScreenWeaknessCoverage />}
              />
              <Route path="/offense/" element={<ScreenOffense />} />
              <Route path="/defense/" element={<ScreenDefense />} />
              <Route path="/defense/team/" element={<ScreenDefenseTeam />} />
              <Route path="/defense/" element={<ScreenDefense />} />
              <Route path="/pokedex/help/" element={<ScreenPokedexHelp />} />
              <Route path="/pokedex/" element={<ScreenPokedex />} />
              <Route
                path="/more/"
                element={
                  <ScreenMore
                    needsAppUpdate={needRefresh}
                    updateApp={updateApp}
                  />
                }
              />
              <Route
                path="/_error"
                element={<ScreenError error={exampleError} />}
              />
              <Route path="/*" element={<Navigate to="/defense/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </HelmetProvider>
    </AppContextProvider>
  );
}
