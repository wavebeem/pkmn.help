import classnames from "classnames";
import * as React from "react";
import { CoverageType } from "./App";
import { Effectiveness, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";
import { pickFile } from "./pickFile";
import { AllPokemon } from "./pkmn";
import Papa from "papaparse";
import { saveFile } from "./saveFile";

const fallbackCoverageTypes = AllPokemon.filter((pkmn) => {
  // Slowking is weird right now... thanks Bulbapedia
  const [t1, t2] = pkmn.types as string[];
  return t1 !== "???" && t2 !== "???";
}).map<CoverageType>((pkmn) => {
  return {
    number: String(pkmn.number),
    name: pkmn.name,
    form: pkmn.formName,
    type1: pkmn.types[0],
    type2: pkmn.types[1] ?? Type.NONE,
  };
});

interface DexCoverageProps {
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  types: Type[];
}

const buttonClasses = classnames(
  "no-underline",
  "db",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus",
  "active-squish",
  "border2 button-shadow button-bg button-bg-hover color-inherit"
);

const DexCoverage: React.FC<DexCoverageProps> = ({
  coverageTypes = fallbackCoverageTypes,
  setCoverageTypes,
  types,
}) => {
  const count = coverageTypes.filter(({ type1, type2 }) => {
    const matchups = types.map((t) => matchupFor(type1, type2, t));
    return matchups.some((effectiveness) => {
      return effectiveness > Effectiveness.REGULAR;
    });
  }).length;
  const total = coverageTypes.length;
  const ratio = count / total;
  const percent = (ratio * 100).toFixed(0);
  function saveCSV() {
    const csv = Papa.unparse(
      {
        fields: ["Number", "Name", "Form", "Type 1", "Type 2"],
        data: fallbackCoverageTypes.map((t) => {
          return [t.number, t.name, t.form, t.type1, t.type2];
        }),
      },
      {
        header: true,
        skipEmptyLines: true,
      }
    );
    saveFile({
      filename: "pkmn.help type coverage.csv",
      type: "text/csv",
      data: csv,
    });
  }
  async function loadCSV() {
    const file = await pickFile({ accept: "text/csv" });
    if (!file) {
      return;
    }
    const text = await file.text();
    const result = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        return header.toLowerCase().split(/\s+/).join("");
      },
      transform: (value, field) => {
        if (field === "type1" || field === "type2") {
          if (value === "") {
            return "none";
          } else {
            return value.toLowerCase();
          }
        }
        return value;
      },
    });
    if (result.errors.length > 0) {
      alert("Error loading CSV. Don't change header names.");
      return;
    }
    console.log(result.data);
    // TODO: Verify the data is formed correctly
    setCoverageTypes(result.data as any);
  }
  return (
    <div className="pt1 tabular-nums flex flex-column lh-copy">
      <PercentBar value={count} max={total} />
      <div className="flex items-center">
        <div className="tl mr2 w3">{percent}%</div>
        <div className="flex-auto tr">
          {count} / {total} forms
        </div>
      </div>
      <div className="flex justify-center pt2">
        <button
          type="button"
          className={buttonClasses}
          onClick={() => {
            saveCSV();
          }}
        >
          Save
        </button>
        <div className="pl2" />
        <button
          type="button"
          className={buttonClasses}
          onClick={() => {
            loadCSV();
          }}
        >
          Load
        </button>
        <div className="pl2" />
        <a
          href="#"
          className="db pv1 ph2 f5 fg-link OutlineFocus"
          onClick={(event) => {
            event.preventDefault();
            alert(
              "Use 'Save' to download a CSV of all Pokémon forms. You can edit this CSV in Google Docs or Microsoft Excel, then use 'Load' to use the data. You can use this to check coverage against a custom dex (e.g. OU tier monsters, fan games)."
            );
          }}
        >
          Help
        </a>
      </div>
    </div>
  );
};

DexCoverage.displayName = "DexCoverage";

export default DexCoverage;
