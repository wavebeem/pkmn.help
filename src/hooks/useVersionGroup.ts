import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useVersionGroup(): [string, Dispatch<SetStateAction<string>>] {
  const [versionGroup, setGeneration] = useLocalStorage<string>(
    "version_group",
    "*",
  );
  return [versionGroup, setGeneration];
}
