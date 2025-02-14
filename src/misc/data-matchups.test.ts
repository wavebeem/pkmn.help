import { expect, test } from "vitest";
import * as Matchups from "./data-matchups";
import * as Types from "./data-types";

type Maybe<T> = T | null | undefined;

function compact<T>(list: readonly Maybe<T>[]): T[] {
  return list.filter((x): x is T => x != null);
}

const abilities = Object.keys(Types.abilities) as Types.AbilityName[];

for (const specialMove of [...Types.specialMoves, undefined]) {
  for (const abilityName of abilities) {
    for (const type of Types.types) {
      const params = new URLSearchParams({
        type,
        abilityName,
        specialMove: specialMove || "",
      });
      test(`offensiveMatchups?${params}`, () => {
        const result = Matchups.offensiveMatchups({
          gen: "default",
          offenseAbilities: [abilityName],
          offenseTypes: [type],
          specialMoves: compact([specialMove]),
        });
        expect(result).toMatchSnapshot();
      });
    }
  }
}
