import classNames from "classnames";
import * as React from "react";
import { typeColor } from "./colors";
import { Type } from "./data-types";
import { getImage } from "./getImage";
import styles from "./MonsterImage.module.css";

type State = "loading" | "loaded" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  types: Type[];
  onLoad?: ({ pokemonID }: { pokemonID: string }) => void;
  imageType: "sprite" | "hd";
  scale?: number;
  shiny?: boolean;
}

export function MonsterImage({
  pokemonID,
  types,
  onLoad,
  imageType,
  scale = 1,
  shiny = false,
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
      className={classNames(
        state === "errored" && [styles.image, "br-pill"],
        styles.bounce
      )}
      style={{
        ["--type-color" as any]: typeColor(types[0]),
      }}
    >
      <img
        src={getImage(pokemonID + (shiny ? "-shiny" : ""))}
        role="presentation"
        alt=""
        data-shiny={shiny}
        className={classNames("db img-shadow h-auto", {
          "o-0": state === "errored",
          "img-crisp": imageType === "sprite",
        })}
        width={96 * scale}
        height={96 * scale}
        onLoad={setLoaded}
        onError={setErrored}
      />
    </div>
  );
}
