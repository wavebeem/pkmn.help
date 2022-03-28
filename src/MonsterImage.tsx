import classNames from "classnames";
import * as React from "react";
import { typeColor } from "./colors";
import { Type } from "./data";
import { getImage } from "./getImage";

type State = "loading" | "loaded" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  types: Type[];
  onLoad?: ({ pokemonID }: { pokemonID: string }) => void;
  scale?: number;
}

export function MonsterImage({
  pokemonID,
  types,
  onLoad,
  scale = 1,
}: MonsterImageProps): JSX.Element {
  const [state, setState] = React.useState<State>("loading");
  const setLoaded = React.useCallback(() => {
    setState("loaded");
    onLoad?.({ pokemonID });
  }, [onLoad, pokemonID]);
  const setErrored = React.useCallback(() => {
    setState("errored");
  }, []);
  return (
    <div
      className={classNames(state === "errored" && ["MonsterImage br-pill"])}
      style={{
        ["--type-color" as any]: typeColor(types[0]),
      }}
    >
      <img
        src={getImage(pokemonID)}
        role="presentation"
        alt=""
        className={classNames("db img-crisp h-auto", {
          "o-0": state === "errored",
        })}
        width={96 * scale}
        height={96 * scale}
        onLoad={setLoaded}
        onError={setErrored}
      />
    </div>
  );
}
