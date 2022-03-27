import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CoverageType, matchupFor, typesFromString } from "./data";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { MonsterType } from "./MonsterType";

interface WeaknessListProps {
  coverageTypes: CoverageType[];
  offenseParams: string;
}

export default function ScreenWeaknessList({
  coverageTypes,
  offenseParams,
}: WeaknessListProps) {
  const { t } = useTranslation();
  const types = typesFromString(
    new URLSearchParams(offenseParams).get("types") || ""
  );
  const weak = coverageTypes.filter((ct) => {
    const matchups = types.map((t) => matchupFor(ct.types, t));
    return matchups.some((effectiveness) => {
      return effectiveness > 1;
    });
  });
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">{t("coverage.heading")}</h2>
      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <Link
          to={`/offense/${offenseParams}`}
          className="underline fg-link OutlineFocus"
        >
          {t("coverage.back")}
        </Link>
      </p>
      <ul className="list pa0 border3 bt">
        {weak.map(({ number, name, types }, i) => {
          return (
            <li key={i} className="pv2 bb border3 flex gap2">
              <span className="fg3">{formatMonsterNumber(Number(number))}</span>
              <span className="b flex-auto">{name}</span>
              <div className="flex">
                {types.map((t, i) => (
                  <MonsterType key={t} type={t} index={i} />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <Link
          to={`/offense/${offenseParams}`}
          className="underline fg-link OutlineFocus"
        >
          {t("coverage.back")}
        </Link>
      </p>
    </main>
  );
}
