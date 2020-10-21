import classnames from "classnames";
import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
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

interface TabProps {
  title: string;
  url: string;
}

function Tab(props: TabProps) {
  return (
    <NavLink
      to={props.url}
      className={classnames([
        "no-underline",
        "pv2 ph2 f5",
        "no-outline tab-bottom-focus",
        "b bn",
        "br--top br4",
        "bg-transparent",
        "hover-black-90",
        "black-50 bottom-border-thick",
      ])}
      activeClassName={classnames([
        "black bottom-border-thick-current",
        "no-pointer",
      ])}
    >
      {props.title}
    </NavLink>
  );
}

Tab.displayName = "Tab";

export default function App() {
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  return (
    <div className="sans-serif bg-near-white near-black min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white bg-dark-red PokeballHeader">
          <a href="#" className="no-underline white hover-white-80 DashedFocus">
            Pokémon Type Calculator
          </a>
        </h1>
        <div>
          <div
            className={classnames([
              "flex justify-center",
              "bg-white",
              "bb TabBarBorder b--black-20",
              "pt3",
            ])}
          >
            <Tab title="Offense" url={`/offense${offenseParams}`} />
            <Tab title="Defense" url={`/defense${defenseParams}`} />
            <Tab title="Pokédex" url={`/pokedex${pokedexParams}`} />
            <Tab title="Info" url="/info" />
          </div>
          <Switch>
            <Route
              path="/offense"
              render={() => (
                <ScreenOffense setOffenseParams={setOffenseParams} />
              )}
            />
            <Route
              path="/defense"
              render={() => (
                <ScreenDefense setDefenseParams={setDefenseParams} />
              )}
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
    </div>
  );
}

App.displayName = "App";
