import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "usehooks-ts";
import { VersionGroup } from "../misc/data-version-groups";

export function useVersionGroup(): [
  VersionGroup,
  Dispatch<SetStateAction<string>>,
] {
  const [versionGroup, setGeneration] = useLocalStorage<string>(
    "version_group",
    "",
  );
  switch (versionGroup) {
    case "red-blue":
    case "yellow":
    case "red-green-japan":
    case "blue-japan":
    case "gold-silver":
    case "crystal":
    case "ruby-sapphire":
    case "emerald":
    case "firered-leafgreen":
    case "colosseum":
    case "xd":
    case "diamond-pearl":
    case "platinum":
    case "heartgold-soulsilver":
    case "black-white":
    case "black-2-white-2":
    case "x-y":
    case "omega-ruby-alpha-sapphire":
    case "sun-moon":
    case "ultra-sun-ultra-moon":
    case "lets-go-pikachu-lets-go-eevee":
    case "sword-shield":
    case "the-isle-of-armor":
    case "the-crown-tundra":
    case "brilliant-diamond-shining-pearl":
    case "legends-arceus":
    case "scarlet-violet":
    case "the-teal-mask":
    case "the-indigo-disk":
    case "legends-za":
    case "mega-dimension":
    case "champions": {
      return [versionGroup, setGeneration];
    }
    default: {
      return ["", setGeneration];
    }
  }
}
