import classNames from "classnames";
import { Helmet } from "react-helmet";
import * as React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "./Button";
import { CoverageType, Pokemon, Type } from "./data";
import ScreenDefense from "./ScreenDefense";
import ScreenMore from "./ScreenMore";
import ScreenOffense from "./ScreenOffense";
import ScreenPokedex from "./ScreenPokedex";
import ScreenPokedexHelp from "./ScreenPokedexHelp";
import ScreenWeaknessCoverage from "./ScreenWeaknessCoverage";
import { PUBLIC_PATH } from "./settings";
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

export default function App() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();
  useUpdateSW();
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);
  const [attemptTime, setAttemptTime] = React.useState(Date.now());
  React.useEffect(() => {
    async function load() {
      const filename = "data-pkmn.json";
      try {
        const bigURL = new URL(filename, PUBLIC_PATH).href;
        const resp = await fetch(bigURL);
        const allPokemon: Pokemon[] = await resp.json();
        const fallbackCoverageTypes = allPokemon.map<CoverageType>((pkmn) => {
          return {
            number: String(pkmn.number),
            name: pkmn.name,
            type1: pkmn.types[0],
            type2: pkmn.types[1] ?? Type.NONE,
          };
        });
        setIsLoading(false);
        setCoverageTypes(fallbackCoverageTypes);
        setFallbackCoverageTypes(fallbackCoverageTypes);
        setAllPokemon(allPokemon);
      } catch (err) {
        console.warn(`Failed to download ${filename}`, err);
        const retryDelay = 60 * 1000;
        // Retry every minute until the JSON finishes downloading
        setTimeout(() => {
          setAttemptTime(Date.now());
        }, retryDelay);
      }
    }
    load();
  }, [attemptTime]);
  const [theme] = useTheme();
  return (
    <div className="flex-auto">
      <Helmet>
        <html data-theme={theme} />
        {theme !== "dark" && (
          <meta name="theme-color" content="hsl(357, 97%, 46%)" />
        )}
        {theme !== "light" && (
          <meta
            name="theme-color"
            content="hsl(350, 70%, 40%)"
            // @ts-expect-error media attribute not supported yet
            media={
              theme === "auto" ? "(prefers-color-scheme: dark)" : undefined
            }
          />
        )}
      </Helmet>
      <h1 className="f3-ns f4 tc relative white PokeballHeader">
        <Link to="/" className="no-underline white OutlineFocus">
          Pokémon Type Calculator
        </Link>
      </h1>
      <nav
        className={classNames([
          "flex justify-center",
          "bg1",
          "bb border2 TabBarShadow",
          "pt3",
        ])}
      >
        <NavLink
          className={tabClass}
          activeClassName={tabClassActive}
          to={`/offense/${offenseParams}`}
        >
          Offense
        </NavLink>
        <NavLink
          className={tabClass}
          activeClassName={tabClassActive}
          to={`/defense/${defenseParams}`}
        >
          Defense
        </NavLink>
        <NavLink
          className={tabClass}
          activeClassName={tabClassActive}
          to={`/pokedex/${pokedexParams}`}
        >
          Pokédex
        </NavLink>
        <NavLink
          className={tabClass}
          activeClassName={tabClassActive}
          to="/more/"
        >
          More
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
    </div>
  );
}
