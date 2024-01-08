import classNames from "classnames";
import * as React from "react";
import { getImage } from "./getImage";
import styles from "./MonsterImage.module.css";

type State = "loading" | "loaded" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  onLoad?: ({ pokemonID }: { pokemonID: string }) => void;
  imageType: "sprite" | "hd";
  scale?: number;
  shiny?: boolean;
}

export function MonsterImage({
  pokemonID,
  onLoad,
  imageType,
  scale = 1,
  shiny = false,
}: MonsterImageProps): JSX.Element {
  const size = 96 * scale;
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
      className={classNames(styles.container)}
      style={{ ["--size-px" as any]: `${size}px` }}
    >
      <div
        hidden={state !== "errored"}
        className={classNames("br-pill", styles.placeholder)}
      >
        ?
      </div>
      <img
        src={getImage(pokemonID + (shiny ? "-shiny" : ""))}
        role="presentation"
        alt=""
        hidden={state !== "loaded"}
        data-shiny={shiny}
        className={classNames("db img-shadow h-auto", styles.image, {
          "img-crisp": imageType === "sprite",
        })}
        width={size}
        height={size}
        onLoad={setLoaded}
        onError={setErrored}
      />
    </div>
  );
}
