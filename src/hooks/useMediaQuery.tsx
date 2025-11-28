import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";

export function useMediaQuery(query: string): boolean {
  const media = matchMedia(query);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    media.addEventListener("change", forceUpdate);
    return () => {
      media.removeEventListener("change", forceUpdate);
    };
  });

  return media.matches;
}
