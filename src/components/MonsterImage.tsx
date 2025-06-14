import classNames from "classnames";
import { useState, useCallback, ReactNode } from "react";
import { getPngSrc, getWebpSrcSet } from "../misc/getImage";
import styles from "./MonsterImage.module.css";
import { customProperties } from "../misc/customProperties";

type State = "loaded" | "loading" | "errored";

interface MonsterImageProps {
  pokemonID: string;
  onLoad?: ({ pokemonID }: { pokemonID: string }) => void;
  scale?: number;
  shiny?: boolean;
  animationState?: 0 | 1 | 2;
}

export function MonsterImage({
  pokemonID,
  onLoad,
  scale = 0.5,
  shiny = false,
  animationState = 0,
}: MonsterImageProps): ReactNode {
  const size = 512 * scale;
  const [state, setState] = useState<State>("loading");
  const setLoaded = useCallback(() => {
    setState("loaded");
    onLoad?.({ pokemonID });
  }, [onLoad, pokemonID]);
  const setErrored = useCallback(() => {
    setState("errored");
  }, []);
  return (
    <div
      className={classNames(styles.container)}
      style={customProperties({
        "--size-px": `${size}px`,
      })}
    >
      <div hidden={state !== "errored"} className={styles.placeholder}>
        ?
      </div>
      <picture
        hidden={state === "errored"}
        onLoad={setLoaded}
        onError={setErrored}
      >
        <source
          srcSet={getWebpSrcSet({ id: pokemonID, shiny })}
          type="image/webp"
        />
        <img
          loading="lazy"
          src={getPngSrc({ id: pokemonID, shiny })}
          role="presentation"
          alt=""
          data-shiny={shiny && state === "loaded"}
          data-animation-state={animationState}
          className={styles.image}
          width={size}
          height={size}
        />
      </picture>
    </div>
  );
}
