import classnames from "classnames";
import * as React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CoverageType, Pokemon, Type } from "./data";
import ScreenDefense from "./ScreenDefense";
import ScreenInfo from "./ScreenInfo";
import ScreenOffense from "./ScreenOffense";
import ScreenPokedex from "./ScreenPokedex";
import ScreenPokedexHelp from "./ScreenPokedexHelp";
import ScreenWeaknessCoverage from "./ScreenWeaknessCoverage";
import { PUBLIC_PATH } from "./settings";

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
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);
  React.useEffect(() => {
    async function load() {
      const bigURL = new URL("data-pkmn.json", PUBLIC_PATH).href;
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
    }
    load();
  }, []);
  return (
    <div className="flex-auto">
      <h1 className="f3-ns f4 tc relative white PokeballHeader">
        <Link to="/" className="no-underline white OutlineFocus">
          Pokémon Type Calculator
        </Link>
      </h1>
      <nav
        className={classnames([
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
          to="/info/"
        >
          Info
        </NavLink>
      </nav>
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
        <Route exact path="/info/" component={ScreenInfo} />
        <Redirect to="/defense/" />
      </Switch>
    </div>
  );
}
