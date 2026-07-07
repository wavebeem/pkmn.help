import { assertNever } from "../misc/assertNever";
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
    case "yellow":
    case "blue-japan":
    case "red-blue":
    case "red-green-japan": {
      return "gen1";
    }
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
    case "brilliant-diamond-shining-pearl":
    case "champions":
    case "legends-arceus":
    case "legends-za":
    case "lets-go-pikachu-lets-go-eevee":
    case "mega-dimension":
    case "omega-ruby-alpha-sapphire":
    case "scarlet-violet":
    case "sun-moon":
    case "sword-shield":
    case "the-crown-tundra":
    case "the-indigo-disk":
    case "the-isle-of-armor":
    case "the-teal-mask":
    case "ultra-sun-ultra-moon":
    case "x-y":
    case "": {
      return "default";
    }
    default: {
      assertNever(versionGroup);
    }
  }
}
