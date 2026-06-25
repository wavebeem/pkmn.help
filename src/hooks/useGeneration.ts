import { Generation } from "../misc/data-generations";
import { VersionGroup } from "../misc/data-version-groups";
import { useVersionGroup } from "./useVersionGroup";

export function useGeneration(): Generation {
  const [versionGroup] = useVersionGroup();
  return versionGroupToGeneration(versionGroup);
}

export function versionGroupToGeneration(
  versionGroup: VersionGroup,
): Generation {
  switch (versionGroup) {
    // Generation I
    case "yellow":
    case "blue-japan":
    case "red-blue":
    case "red-green-japan": {
      return "gen1";
    }
    // Generation II-V
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
    // case "brilliant-diamond-shining-pearl":
    // case "lets-go-pikachu-lets-go-eevee":
    default: {
      return "default";
    }
  }
}
