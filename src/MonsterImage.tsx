import classNames from "classnames";
import * as React from "react";
import { cssType } from "./cssType";
import { Type } from "./data";
import { getImage } from "./getImage";

type State = "loading" | "loaded" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  types: Type[];
}

export function MonsterImage({
  pokemonID,
  types,
}: MonsterImageProps): JSX.Element {
  const [state, setState] = React.useState<State>("loading");
  const setLoaded = React.useCallback(() => {
    setState("loaded");
  }, []);
  const setErrored = React.useCallback(() => {
    setState("errored");
  }, []);
  return (
    <div
      className={classNames(
        state === "errored" && ["MonsterImage br-pill", cssType(types[0])]
      )}
    >
      <img
        src={getImage(pokemonID)}
        role="presentation"
        alt=""
        className={classNames("db img-crisp", { "o-0": state === "errored" })}
        width={96}
        height={96}
        onLoad={setLoaded}
        onError={setErrored}
      />
    </div>
  );
}
