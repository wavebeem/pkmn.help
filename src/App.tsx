import classNames from "classnames";
import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "./Button";
import { CoverageType, Pokemon } from "./data";
import { formatPokemonName } from "./formatPokemonName";
import ScreenDefense from "./ScreenDefense";
import ScreenMore from "./ScreenMore";
import ScreenOffense from "./ScreenOffense";
import ScreenPokedex from "./ScreenPokedex";
import ScreenPokedexHelp from "./ScreenPokedexHelp";
import ScreenWeaknessCoverage from "./ScreenWeaknessCoverage";
import { PUBLIC_PATH } from "./settings";
import { useFetchJSON } from "./useFetchJSON";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useUpdateSW } from "./useUpdateSW";

const bannerClass = classNames([
  "button-shadow",
  "bg1 fg1",
  "border2 ba",
  "br2 pa3",
  "justify-center flex",
]);

const tabClass = classNames([
  "no-underline",
  "pv2 ph2 f5",
  "TabFocus",
  "b bn",
  "br--top br2",
  "bg-transparent",
  "fg3 bottom-border-thick",
]);

const tabClassActive = classNames(["fg1 bottom-border-thick-current"]);

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

export default function App() {
  // Service worker
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();
  useUpdateSW();

  const t = useTranslationsWithBlankFallback();

  // State...
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);

  const [language] = useLanguage();

  // Theme stuff
  const [theme] = useTheme();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDark = theme === "dark" || (theme === "auto" && isDarkMode);
  const themeColor = isDark ? "hsl(350, 70%, 40%)" : "hsl(357, 97%, 46%)";
  const themeAuto = isDarkMode ? "dark" : "light";

  // Load Pokédex JSON
  const jsonURL = new URL("data-pkmn.json", PUBLIC_PATH).href;
  const allPokemonResponse = useFetchJSON<Pokemon[]>(jsonURL);

  // Fallback coverage types
  React.useEffect(() => {
    if (allPokemonResponse.type !== "done") {
      return;
    }
    const allPokemon = allPokemonResponse.data;
    const fallbackCoverageTypes = allPokemon.map<CoverageType>((pkmn) => {
      const name = formatPokemonName({
        speciesName: pkmn.speciesNames[language],
        formName: pkmn.formNames[language],
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
          <html data-theme={theme} data-theme-auto={themeAuto} />
          <meta name="theme-color" content={themeColor} />
        </Helmet>
        <h1 className="f3-ns f4 tc relative white PokeballHeader">
          <Link to="/" className="no-underline white OutlineFocus">
            {t("title")}
          </Link>
        </h1>
        <nav
          className={classNames([
            "flex justify-center",
            "bg1",
            "bb border2 TabBar",
            "pt3",
          ])}
        >
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/offense/${offenseParams}`}
          >
            {t("navigation.offense")}
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/defense/${defenseParams}`}
          >
            {t("navigation.defense")}
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/pokedex/${pokedexParams}`}
          >
            {t("navigation.pokedex")}
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to="/more/"
          >
            {t("navigation.more")}
          </NavLink>
        </nav>
        {(needRefresh || offlineReady) && (
          <div className="ph3 mw6 center grid gap3 pa3">
            {needRefresh && (
              <div className={bannerClass}>
                <span className="flex flex-auto items-center">
                  An update is available
                </span>
                <Button
                  className="ml3"
                  type="button"
                  onClick={() => {
                    updateServiceWorker(true);
                    setNeedRefresh(false);
                  }}
                >
                  Update
                </Button>
              </div>
            )}
            {offlineReady && (
              <div className={bannerClass}>
                <span className="flex flex-auto items-center">
                  Offline mode is now available
                </span>
                <Button
                  className="ml3"
                  type="button"
                  onClick={() => {
                    setOfflineReady(false);
                  }}
                >
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        )}
        <React.Suspense fallback={<div className="Spinner center mt4 f2" />}>
          <Switch>
            <Route
              exact
              path="/offense/coverage/"
              render={() => (
                <ScreenWeaknessCoverage
                  setCoverageTypes={setCoverageTypes}
                  offenseParams={offenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              exact
              path="/offense/"
              render={() => (
                <ScreenOffense
                  coverageTypes={coverageTypes}
                  setCoverageTypes={setCoverageTypes}
                  setOffenseParams={setOffenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              exact
              path="/defense/"
              render={() => (
                <ScreenDefense
                  setDefenseParams={setDefenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                />
              )}
            />
            <Route
              exact
              path="/pokedex/help/"
              render={() => <ScreenPokedexHelp pokedexParams={pokedexParams} />}
            />
            <Route
              exact
              path="/pokedex/"
              render={() => (
                <ScreenPokedex
                  setPokedexParams={setPokedexParams}
                  allPokemon={AllPokemon}
                  isLoading={isLoading}
                />
              )}
            />
            <Route exact path="/more/" component={ScreenMore} />
            <Redirect to="/defense/" />
          </Switch>
        </React.Suspense>
      </div>
    </HelmetProvider>
  );
}
