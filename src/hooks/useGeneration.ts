import { Generation } from "../misc/data-generations";
import { useVersionGroup } from "./useVersionGroup";

export function useGeneration(): Generation {
  const [versionGroup] = useVersionGroup();
  switch (versionGroup) {
    // Generation I and remakes
    case "lets-go-pikachu-lets-go-eevee":
    case "yellow":
    case "blue-japan":
    case "red-blue":
    case "red-green-japan": {
      return "gen1";
    }
    // Generation II-V and remakes
    case "brilliant-diamond-shining-pearl":
    case "black-2-white-2":
    case "black-white":
    case "heartgold-soulsilver":
    case "platinum":
    case "diamond-pearl":
    case "xd":
    case "colosseum":
    case "firered-leafgreen":
    case "emerald":
    case "ruby-sapphire":
    case "gold-silver":
    case "crystal": {
      return "gen2";
    }
    // Generaton VI+
    default: {
      return "default";
    }
  }
}
