import classnames from "classnames";
import * as React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import ScreenInfo from "./ScreenInfo";
import ScreenDefense from "./ScreenDefense";
import ScreenOffense from "./ScreenOffense";

const ScreenPokedex = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "ScreenPokedex" */
    /* webpackPrefetch: true */
    "./ScreenPokedex"
  );
});

const tabClass = classnames([
  "no-underline",
  "pv2 ph2 f5",
  "no-outline tab-bottom-focus",
  "b bn",
  "br--top br2",
  "bg-transparent",
  "hover-black-90",
  "black-50 bottom-border-thick",
]);

const tabClassActive = classnames([
  "black bottom-border-thick-current",
  "no-pointer",
]);

export default function App() {
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  return (
    <div className="sans-serif bg-near-white near-black min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white bg-dark-red PokeballHeader">
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
            "bg-white",
            "bb TabBarBorder b--black-30",
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
            path="/offense"
            render={() => <ScreenOffense setOffenseParams={setOffenseParams} />}
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
