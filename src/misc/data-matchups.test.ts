import { expect, test, describe } from "vitest";
import * as Matchups from "./data-matchups";
import * as Types from "./data-types";

type Maybe<T> = T | null | undefined;

function compact<T>(list: readonly Maybe<T>[]): T[] {
  return list.filter((x): x is T => x != null);
}

const abilities = Object.keys(Types.abilities) as Types.AbilityName[];

for (const type of Types.types) {
  describe(type, () => {
    for (const specialMove of [...Types.specialMoves, undefined]) {
      describe(String(specialMove || ""), () => {
        test("offensiveMatchups", () => {
          const result = Matchups.offensiveMatchups({
            gen: "default",
            offenseAbilities: [],
            offenseTypes: [type],
            specialMoves: compact([specialMove]),
            kind: "combination",
          });
          expect(result.toTestFormat()).toMatchSnapshot();
        });
      });
    }

    for (const abilityName of abilities) {
      describe(abilityName, () => {
        test("offensiveMatchups", () => {
          const result = Matchups.offensiveMatchups({
            gen: "default",
            offenseAbilities: [abilityName],
            offenseTypes: [type],
            specialMoves: [],
            kind: "combination",
          });
          expect(result.toTestFormat()).toMatchSnapshot();
        });
      });
    }
  });
}
