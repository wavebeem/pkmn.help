import * as React from "react";
import { useLocalStorage } from "usehooks-ts";
import { Generation } from "../misc/data-generations";

export function useGeneration(): [
  Generation,
  React.Dispatch<React.SetStateAction<Generation>>
] {
  const [generation, setGeneration] = useLocalStorage<Generation>(
    "generation",
    "default"
  );
  return [generation, setGeneration];
}
