import classNames from "classnames";
import { closest } from "fastest-levenshtein";
import Papa from "papaparse";
import * as React from "react";
import { Link } from "react-router-dom";
import { CoverageType, objectToCoverageType, stringToType, Type } from "./data";
import { pickFile } from "./pickFile";
import { saveFile } from "./saveFile";
import { useTypeCount } from "./useTypeCount";

const buttonClasses = classNames(
  "no-underline",
  "db",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus",
  "active-squish",
  "border1 button-shadow button-bg button-bg-hover color-inherit"
);

interface WeaknessCoverageProps {
  setCoverageTypes: (types: CoverageType[]) => void;
  offenseParams: string;
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export default function ScreenWeaknessCoverage({
  setCoverageTypes,
  offenseParams,
  fallbackCoverageTypes,
  isLoading,
}: WeaknessCoverageProps) {
  const [lastUpdated, setLastUpdated] = React.useState(new Date());
  const [statusText, setStatusText] = React.useState("");
  const [typeCount] = useTypeCount();
  const statusRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    if (statusRef.current instanceof HTMLElement) {
      statusRef.current.scrollIntoView();
    }
  }, [lastUpdated]);

  function saveCSV() {
    const fields = ["Number", "Name", "Type 1", "Type 2"];
    if (Number(typeCount) === 3) {
      fields.push("Type 3");
    }
    const csv = Papa.unparse(
      {
        fields,
        data: fallbackCoverageTypes.map((t) => {
          const data = [t.number, t.name, t.types[0], t.types[1] || ""];
          if (Number(typeCount) === 3) {
            data.push(t.types[2] || "");
          }
          return data;
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
    setStatusText("Exported default Pokémon forms");
    setLastUpdated(new Date());
  }

  async function loadCSV() {
    const file = await pickFile({ accept: ".csv" });
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
          "type1",
          "type2",
          "type3",
        ]);
      },
      transform: (value, field) => {
        if (field === "type1") {
          return stringToType(value, Type.NORMAL);
        }
        if (field === "type2" || field === "type3") {
          return stringToType(value, Type.NONE);
        }
        return value;
      },
    });
    if (result.errors.length > 0) {
      alert("Error loading CSV. Don't change header names.");
      return;
    }
    const newCoverageTypes = result.data.map(objectToCoverageType);
    setStatusText(
      `Imported ${newCoverageTypes.length} Pokémon forms from "${file.name}"`
    );
    setCoverageTypes(newCoverageTypes);
    setLastUpdated(new Date());
  }

  function loadDefault() {
    setStatusText("Loaded default Pokémon forms");
    setCoverageTypes(fallbackCoverageTypes);
    setLastUpdated(new Date());
  }

  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">Weakness Coverage</h2>
      <p>
        Import/export custom Pokédex CSV files to see weakness coverage for
        different Pokémon. Create a custom CSV file with just the OU tier
        Pokémon, or even create your own Pokémon from scratch.
      </p>
      <p>
        CSV data is loaded by column header name, not column order, so you can
        add or re-order columns if you want (e.g. add a &quot;tier&quot; column,
        or a &quot;notes&quot; column).
      </p>
      <p>
        CSV files can be edited with Google Sheets, Microsoft Excel, OpenOffice,
        LibreOffice, Notepad, and more.
      </p>
      {isLoading ? (
        <div className="Spinner center mt4 f2" />
      ) : (
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
          <span>Export the default Pokédex to a CSV file</span>

          <button
            type="button"
            className={buttonClasses}
            onClick={() => {
              loadCSV();
            }}
          >
            Import
          </button>
          <span>Import an edited Pokédex CSV file</span>

          <button
            type="button"
            className={buttonClasses}
            onClick={() => {
              loadDefault();
            }}
          >
            Reset
          </button>
          <span>Reset to the default Pokédex</span>
        </div>
      )}
      <p className="f4 b" hidden={!statusText} ref={statusRef}>
        {statusText}
      </p>
      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <Link
          to={`/offense/${offenseParams}`}
          className="underline fg-link OutlineFocus"
        >
          Back to offense
        </Link>
      </p>
    </main>
  );
}
