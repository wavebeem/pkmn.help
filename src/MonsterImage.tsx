import classNames from "classnames";
import * as React from "react";
import { getImage } from "./getImage";

type State = "loading" | "loaded" | "errored";

interface MonsterImageProps {
  pokemonID: string;
}

export function MonsterImage({ pokemonID }: MonsterImageProps): JSX.Element {
  const [state, setState] = React.useState<State>("loading");
  const setLoaded = React.useCallback(() => {
    setState("loaded");
  }, []);
  const setErrored = React.useCallback(() => {
    setState("errored");
  }, []);
  return (
    <img
      src={getImage(pokemonID) + "x"}
      role="presentation"
      alt=""
      className={classNames("img-crisp", state === "loaded" ? "db" : "dn")}
      width={96}
      height={96}
      onLoad={setLoaded}
      onError={setErrored}
    />
  );
}
