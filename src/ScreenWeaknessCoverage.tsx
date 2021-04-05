import classnames from "classnames";
import { closest } from "fastest-levenshtein";
import Papa from "papaparse";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  CoverageType,
  fallbackCoverageTypes,
  objectToCoverageType,
  stringToType,
} from "./data";
import { pickFile } from "./pickFile";
import { saveFile } from "./saveFile";

const buttonClasses = classnames(
  "no-underline",
  "db",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus",
  "active-squish",
  "border2 button-shadow button-bg button-bg-hover color-inherit"
);

interface WeaknessCoverageProps {
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  offenseParams: string;
  setOffenseParams: (params: string) => void;
}

export default function ScreenWeaknessCoverage({
  coverageTypes = fallbackCoverageTypes,
  setCoverageTypes,
  offenseParams,
  setOffenseParams,
}: WeaknessCoverageProps) {
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
        return closest(header.toLowerCase().replace(/[a-z0-9]/i, ""), [
          "number",
          "name",
          "form",
          "type1",
          "type2",
        ]);
      },
      transform: (value, field) => {
        if (field === "type1" || field === "type2") {
          return stringToType(value);
        }
        return value;
      },
    });
    if (result.errors.length > 0) {
      alert("Error loading CSV. Don't change header names.");
      return;
    }
    const newCoverageTypes = result.data.map(objectToCoverageType);
    setCoverageTypes(newCoverageTypes);
  }

  function loadDefault() {
    setCoverageTypes(fallbackCoverageTypes);
  }

  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">Weakness Coverage</h2>
      <p>
        Import/export custom Pokédex CSV files to see weakness coverage for
        different Pokémon. Create a custom CSV file with just the OU tier
        Pokémon, or even create your own Pokémon from scratch.
      </p>
      <div className="pt2 ButtonGrid">
        <button
          type="button"
          className={buttonClasses}
          onClick={() => {
            saveCSV();
          }}
        >
          Export
        </button>
        <p className="ma0">Export the default Pokédex to a CSV file</p>

        <button
          type="button"
          className={buttonClasses}
          onClick={() => {
            loadCSV();
          }}
        >
          Import
        </button>
        <p className="ma0">Import an edited Pokédex CSV file</p>

        <button
          type="button"
          className={buttonClasses}
          onClick={() => {
            loadDefault();
          }}
        >
          Reset
        </button>
        <p className="ma0">Reset to the default Pokédex</p>
      </div>
      <div className="pt4" />
      <Link
        to={`/offense${offenseParams}`}
        className="underline fg-link OutlineFocus"
        aria-label="Back to offense"
      >
        &larr; Back to offense
      </Link>
    </main>
  );
}

ScreenWeaknessCoverage.displayName = "ScreenWeaknessCoverage";
