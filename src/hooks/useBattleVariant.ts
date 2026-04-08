// import { Dispatch, SetStateAction, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { BattleVariant, battleVariants } from "../misc/data-matchups";

const set = new Set<string>(battleVariants);
function isBattleVariant(s: string): s is BattleVariant {
  return set.has(s);
}

// Wow, putting all your validation in a hook like this is awful! I can see why
// I didn't do it for my other global state things.

export function useBattleVariant(): [
  BattleVariant,
  (bv: BattleVariant) => void,
] {
  const [x, setX] = useLocalStorage("battle_mode", "regular");

  function f(b: BattleVariant | (() => BattleVariant)) {
    if (typeof b === "function") {
      b = b();
    }
    if (isBattleVariant(b)) {
      setX(b);
    }
  }

  if (isBattleVariant(x)) {
    return [x, f];
  }
  return [battleVariants[0], f];
}
