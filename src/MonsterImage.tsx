import classNames from "classnames";
import * as React from "react";
import { typeColor } from "./colors";
import { Type } from "./data-types";
import { getImage } from "./getImage";

type State = "loading" | "loaded" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  types: Type[];
  onLoad?: ({ pokemonID }: { pokemonID: string }) => void;
  imageType: "sprite" | "hd";
  scale?: number;
}

export function MonsterImage({
  pokemonID,
  types,
  onLoad,
  imageType,
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
        className={classNames("db img-shadow h-auto", {
          "o-0": state === "errored",
          "img-crisp": imageType==="sprite"
        })}
        width={96 * scale}
        height={96 * scale}
        onLoad={setLoaded}
        onError={setErrored}
      />
    </div>
  );
}
