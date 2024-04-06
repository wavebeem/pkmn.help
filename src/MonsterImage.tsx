import classNames from "classnames";
import * as React from "react";
import { getPngSrc, getWebpSrcSet } from "./getImage";
import styles from "./MonsterImage.module.css";

type State = "default" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  onLoad?: ({ pokemonID }: { pokemonID: string }) => void;
  scale?: number;
  shiny?: boolean;
}

export function MonsterImage({
  pokemonID,
  onLoad,
  scale = 0.5,
  shiny = false,
}: MonsterImageProps): JSX.Element {
  const size = 512 * scale;
  const [state, setState] = React.useState<State>("default");
  const setLoaded = React.useCallback(() => {
    setState("default");
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
      <picture>
        <source
          srcSet={getWebpSrcSet({ id: pokemonID, shiny })}
          type="image/webp"
        />
        <img
          loading="lazy"
          src={getPngSrc({ id: pokemonID, shiny })}
          role="presentation"
          alt=""
          hidden={state === "errored"}
          data-shiny={shiny}
          className={classNames("db img-shadow h-auto", styles.image)}
          width={size}
          height={size}
          onLoad={setLoaded}
          onError={setErrored}
        />
      </picture>
    </div>
  );
}
