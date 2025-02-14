import { expect, test } from "vitest";
import * as Matchups from "./data-matchups";
import * as Types from "./data-types";

for (const type of Types.types) {
  test(`offensiveMatchups for ${type}`, () => {
    const result = Matchups.offensiveMatchups({
      gen: "default",
      offenseAbilities: [],
      offenseTypes: [],
      specialMoves: [],
    });
    expect(result).toMatchSnapshot();
  });
}
