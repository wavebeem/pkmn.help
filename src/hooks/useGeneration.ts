import { Generation } from "../misc/data-generations";
import { useVersionGroup } from "./useVersionGroup";

export function useGeneration(): Generation {
  const [versionGroup] = useVersionGroup();
  switch (versionGroup) {
    case "red-blue":
    case "yellow":
    case "red-green-japan":
    case "blue-japan": {
      return "gen1";
    }
    case "gold-silver":
    case "crystal": {
      return "gen2";
    }
    default: {
      return "default";
    }
  }
}
