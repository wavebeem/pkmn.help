import classnames from "classnames";
import * as React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CoverageType } from "./data";
import ScreenDefense from "./ScreenDefense";
import ScreenInfo from "./ScreenInfo";

const ScreenPokedex = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "ScreenPokedex" */
    /* webpackPrefetch: true */
    "./ScreenPokedex"
  );
});

const ScreenWeaknessCoverage = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "ScreenWeaknessCoverage" */
    /* webpackPrefetch: true */
    "./ScreenWeaknessCoverage"
  );
});

const ScreenOffense = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "ScreenOffense" */
    /* webpackPrefetch: true */
    "./ScreenOffense"
  );
});

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
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>();
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
              <React.Suspense
                fallback={<div className="Spinner center mt4 f2" />}
              >
                <ScreenWeaknessCoverage
                  setCoverageTypes={setCoverageTypes}
                  offenseParams={offenseParams}
                />
              </React.Suspense>
            )}
          />
          <Route
            path="/offense"
            render={() => (
              <React.Suspense
                fallback={<div className="Spinner center mt4 f2" />}
              >
                <ScreenOffense
                  coverageTypes={coverageTypes}
                  setCoverageTypes={setCoverageTypes}
                  setOffenseParams={setOffenseParams}
                />
              </React.Suspense>
            )}
          />
          <Route
            path="/defense"
            render={() => <ScreenDefense setDefenseParams={setDefenseParams} />}
          />
          <Route
            path="/pokedex"
            render={() => (
              <React.Suspense
                fallback={<div className="Spinner center mt4 f2" />}
              >
                <ScreenPokedex setPokedexParams={setPokedexParams} />
              </React.Suspense>
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
