import * as React from "react";
import * as Router from "react-router";

import { Offense } from "./Offense";
import { Defense } from "./Defense";
import { InfoScreen } from "./InfoScreen";
import { TabContainer, TabItem } from "./Tab";
import { Type, types } from "./data";

const Dex = React.lazy(async () => {
  const { Dex } = await import(
    /* webpackChunkName: "Dex" */
    /* webpackPrefetch: true */
    "./Dex"
  );
  return { default: Dex };
});

if (window.location.pathname === "/") {
  window.history.replaceState(undefined, "Pokémon Type Calculator", "/defense?types=normal");
}

const typeNames = new Map(types.map(t => [t.valueOf(), t]));
const params = new URLSearchParams(window.location.search.toLowerCase());
const paramTypes = params.get("types");
const initTypes: Type[] = [];
if (paramTypes) {
  for (const paramType of paramTypes.split(" ")) {
    const parsedType = typeNames.get(paramType);
    if (parsedType !== undefined) {
      initTypes.push(parsedType);
    }
  }
}

export const App = Router.withRouter(RouterApp);

function RouterApp(props: Router.RouteComponentProps) {
  const [loaded, updateLoaded] = React.useState(false);
  const [offenseTypes, updateOffenseTypes] = React.useState(() =>
    props.location.pathname === "/offense"
      ? initTypes
      : []
  );
  const [type1, updateType1] = React.useState(() =>
    props.location.pathname === "/defense"
      ? initTypes[0] || Type.NORMAL
      : Type.NORMAL
  );
  const [type2, updateType2] = React.useState(() =>
    props.location.pathname === "/defense"
      ? initTypes[1] || Type.NONE
      : Type.NONE
  );
  const [currentPage, updateCurrentPage] = React.useState(() => {
    if (props.location.pathname !== "/pokedex") {
      return 0;
    }
    const paramPage = params.get("page");
    if (paramPage === null) {
      return 0;
    }
    const parsedPage = parseInt(paramPage);
    if (parsedPage === undefined || parsedPage < 1) {
      return 0;
    }
    return parsedPage - 1;
  });
  const [search, updateSearch] = React.useState(() =>
    props.location.pathname === "/pokedex"
      ? params.get("q") || ""
      : ""
  );

  React.useEffect(() => {
    if (loaded && props.location.pathname === "/pokedex") {
      updateCurrentPage(0);
    }
  }, [search]);

  React.useLayoutEffect(() => {
    if (props.location.pathname === "/pokedex") {
      const params = new URLSearchParams();
      if (search) {
        params.set("q", search);
      }
      if (currentPage) {
        params.set("page", (currentPage + 1).toString());
      }
      const url = search || currentPage ? `/pokedex?${params}` : "/pokedex";
      if (search && props.location.search.indexOf("q=") !== -1) {
        props.history.replace(url);
      } else {
        props.history.push(url);
      }
    }
  }, [search, currentPage, props.location.pathname]);

  React.useLayoutEffect(() => {
    if (props.location.pathname === "/offense") {
      if (offenseTypes.length === 0) {
        props.history.replace("/offense");
      } else {
        props.history.replace(`/offense?types=${offenseTypes.join("+")}`);
      }
    }
  }, [offenseTypes, props.location.pathname]);

  React.useLayoutEffect(() => {
    if (props.location.pathname === "/defense") {
      let url = `/defense?types=${type1}`;
      if (type2 && type2 !== Type.NONE && type2 !== type1) {
        url += `+${type2}`;
      }
      props.history.replace(url);
    }
  }, [type1, type2, props.location.pathname]);

  React.useEffect(() => updateLoaded(true), []);

  return (
    <div className="sans-serif bg-near-white near-black min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white bg-dark-red PokeballHeader">
          <a href="#" className="no-underline white hover-white-80 DashedFocus">
            Pokémon Type Calculator
          </a>
        </h1>
        <TabContainer>
          <TabItem name="offense" title="Offense">
            <Offense
              offenseTypes={offenseTypes}
              updateOffenseTypes={updateOffenseTypes}
            />
          </TabItem>
          <TabItem name="defense" title="Defense">
            <Defense
              type1={type1}
              type2={type2}
              updateType1={updateType1}
              updateType2={updateType2}
            />
          </TabItem>
          <TabItem name="pokedex" title="Pokédex">
            <React.Suspense
              fallback={<div className="Spinner center mt4 f2" />}
            >
              <Dex
                search={search}
                updateSearch={updateSearch}
                updateCurrentPage={updateCurrentPage}
                currentPage={currentPage}
                updateType1={updateType1}
                updateType2={updateType2}
              />
            </React.Suspense>
          </TabItem>
          <TabItem name="info" title="Info">
            <InfoScreen />
          </TabItem>
        </TabContainer>
      </div>
    </div>
  );
}

App.displayName = "App";
