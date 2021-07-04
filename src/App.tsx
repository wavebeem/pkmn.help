import classnames from "classnames";
import * as React from "react";
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { CoverageType, Pokemon } from "./data";
import ScreenDefense from "./ScreenDefense";
import ScreenInfo from "./ScreenInfo";
import ScreenOffense from "./ScreenOffense";
import ScreenPokedex from "./ScreenPokedex";
import ScreenPokedexHelp from "./ScreenPokedexHelp";
import ScreenWeaknessCoverage from "./ScreenWeaknessCoverage";
import useShortcut, { cmdCtrlKey } from "./useShortcut";

const tabClass = classnames([
  "no-underline",
  "pv2 ph2 f5",
  "TabFocus",
  "b bn",
  "br--top br2",
  "bg-transparent",
  "fg3 bottom-border-thick",
]);

const tabClassActive = classnames(["fg1 bottom-border-thick-current"]);

export default function App() {
  const history = useHistory();
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);

  // Navigate to pokedex page on pressing cmd/ctrl-f
  useShortcut(
    (event: KeyboardEvent): void => {
      if (event[cmdCtrlKey] && event.key === "f") {
        event.preventDefault();
        history.push(`/pokedex${pokedexParams}`);
      }
    },
    [history, pokedexParams]
  );

  React.useEffect(() => {
    async function load() {
      const bigPKMN = await import(
        /* webpackChunkName: "big-pkmn" */
        /* webpackPrefetch: true */
        "./big-pkmn"
      );
      setIsLoading(false);
      setCoverageTypes(bigPKMN.fallbackCoverageTypes);
      setFallbackCoverageTypes(bigPKMN.fallbackCoverageTypes);
      setAllPokemon(bigPKMN.AllPokemon);
    }
    load();
  }, []);
  return (
    <div className="sans-serif bg2 fg1 min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white PokeballHeader">
          <Link
            to="/"
            className="no-underline white hover-white-90 DottedFocus"
          >
            Pokémon Type Calculator
          </Link>
        </h1>
        <nav
          className={classnames([
            "flex justify-center",
            "bg1",
            "bb TabBarBorder",
            "pt3",
          ])}
        >
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/offense${offenseParams}`}
          >
            Offense
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/defense${defenseParams}`}
          >
            Defense
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/pokedex${pokedexParams}`}
          >
            Pokédex
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to="/info"
          >
            Info
          </NavLink>
        </nav>
        <Switch>
          <Route
            path="/offense/coverage"
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
            path="/offense"
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
            path="/defense"
            render={() => (
              <ScreenDefense
                setDefenseParams={setDefenseParams}
                fallbackCoverageTypes={fallbackCoverageTypes}
              />
            )}
          />
          <Route
            path="/pokedex/help"
            render={() => <ScreenPokedexHelp pokedexParams={pokedexParams} />}
          />
          <Route
            path="/pokedex"
            render={() => (
              <ScreenPokedex
                setPokedexParams={setPokedexParams}
                allPokemon={AllPokemon}
                isLoading={isLoading}
              />
            )}
          />
          <Route path="/info" component={ScreenInfo} />
          <Redirect to="/defense" />
        </Switch>
      </div>
    </div>
  );
}

App.displayName = "App";
