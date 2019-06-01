import {
  defensiveMatchups,
  Effectiveness,
  Type,
  GroupedMatchups
} from "../src/data";

describe(".defensiveMatchups", () => {
  describe("for normal and none", () => {
    let result: GroupedMatchups;

    beforeEach(() => {
      result = defensiveMatchups(Type.NORMAL, Type.NONE);
    });

    describe(".typesFor", () => {
      let typesFor: Type[];

      describe("when effectiveness is zero", () => {
        beforeEach(() => {
          typesFor = result.typesFor(Effectiveness.ZERO);
        });

        it("should only have 1 entry", () => {
          expect(typesFor).toHaveLength(1);
        });

        it("should contain the correct items", () => {
          expect(typesFor).toMatchSnapshot();
        });
      });

      describe("when effectiveness is quarter", () => {
        beforeEach(() => {
          typesFor = result.typesFor(Effectiveness.QUARTER);
        });

        it("should be empty", () => {
          expect(typesFor).toHaveLength(0);
        });
      });

      describe("when effectiveness is half", () => {
        beforeEach(() => {
          typesFor = result.typesFor(Effectiveness.HALF);
        });

        it("should be empty", () => {
          expect(typesFor).toHaveLength(0);
        });
      });

      describe("when effectiveness is regular", () => {
        beforeEach(() => {
          typesFor = result.typesFor(Effectiveness.REGULAR);
        });

        it("should have 16 items", () => {
          expect(typesFor).toHaveLength(16);
        });

        it("should contain the correct items", () => {
          expect(typesFor).toMatchSnapshot();
        });
      });

      describe("when effectiveness is double", () => {
        beforeEach(() => {
          typesFor = result.typesFor(Effectiveness.DOUBLE);
        });

        it("should have 1 item", () => {
          expect(typesFor).toHaveLength(1);
        });

        it("should contain the correct items", () => {
          expect(typesFor).toMatchSnapshot();
        });
      });

      describe("when effectiveness is quadruple", () => {
        beforeEach(() => {
          typesFor = result.typesFor(Effectiveness.QUADRUPLE);
        });

        it("should be empty", () => {
          expect(typesFor).toHaveLength(0);
        });
      });
    });

    it("generates a grouped matchup", () => {
      expect(result).toBeInstanceOf(GroupedMatchups);
    });
  });
});
