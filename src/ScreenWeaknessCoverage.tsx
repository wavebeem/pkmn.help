import Papa from "papaparse";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import {
  CoverageType,
  objectToCoverageType,
  reverseClosestLookup,
  Type,
  typesFromUserInput,
} from "./data-types";
import { IconArrowLeft } from "./IconArrows";
import { pickFile } from "./pickFile";
import { saveFile } from "./saveFile";
import { useTypeCount } from "./useTypeCount";
import Spinner from "./Spinner";
import styles from "./ScreenWeaknessCoverage.module.css";

interface WeaknessCoverageProps {
  setCoverageTypes: (types: CoverageType[]) => void;
  offenseParams: string;
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export function ScreenWeaknessCoverage({
  setCoverageTypes,
  offenseParams,
  fallbackCoverageTypes,
  isLoading,
}: WeaknessCoverageProps) {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = React.useState(new Date());
  const [statusText, setStatusText] = React.useState("");
  const [typeCount] = useTypeCount();
  const statusRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (statusRef.current instanceof HTMLElement) {
      statusRef.current.scrollIntoView();
    }
  }, [lastUpdated]);

  function saveCSV() {
    const fields = [
      t("coverage.csvHeaders.number"),
      t("coverage.csvHeaders.name"),
      t("coverage.csvHeaders.type1"),
      t("coverage.csvHeaders.type2"),
    ];
    if (Number(typeCount) === 3) {
      fields.push(t("coverage.csvHeaders.type3"));
    }
    const csv = Papa.unparse(
      {
        fields,
        data: fallbackCoverageTypes.map((pkmn) => {
          const data = [
            pkmn.number,
            pkmn.name,
            t(`types.${pkmn.types[0]}`),
            pkmn.types[1] ? t(`types.${pkmn.types[1]}`) : "",
          ];
          if (Number(typeCount) === 3) {
            data.push(pkmn.types[2] ? t(`types.${pkmn.types[2]}`) : "");
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
      filename: t("coverage.filename"),
      type: "text/csv",
      data: csv,
    });
    setStatusText(t("coverage.status.exported"));
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
        const map = {
          number: t("coverage.csvHeaders.number"),
          name: t("coverage.csvHeaders.name"),
          type1: t("coverage.csvHeaders.type1"),
          type2: t("coverage.csvHeaders.type2"),
          type3: t("coverage.csvHeaders.type3"),
        };
        const key = header.toLowerCase().replace(/[a-z0-9]/i, "");
        return reverseClosestLookup(key, map);
      },
      transform: (value, field) => {
        if (field === "type1") {
          const [type = Type.normal] = typesFromUserInput({ types: value, t });
          return type;
        }
        if (field === "type2" || field === "type3") {
          const [type = Type.none] = typesFromUserInput({ types: value, t });
          return type;
        }
        return value;
      },
    });
    if (result.errors.length > 0) {
      alert(t("coverage.status.errored"));
      return;
    }
    const newCoverageTypes = result.data.map((obj) => {
      return objectToCoverageType({ obj });
    });

    setStatusText(
      t("coverage.status.imported", {
        n: newCoverageTypes.length,
        file: file.name,
      })
    );
    setCoverageTypes(newCoverageTypes);
    setLastUpdated(new Date());
  }

  function loadDefault() {
    setStatusText(t("coverage.status.reset"));
    setCoverageTypes(fallbackCoverageTypes);
    setLastUpdated(new Date());
  }

  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">{t("coverage.heading")}</h2>
      <p>{t("coverage.paragraph1")}</p>
      <p>{t("coverage.paragraph2")}</p>
      <p>{t("coverage.paragraph3")}</p>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`pt2 items-center ${styles.buttonGrid}`}>
          <Button
            onClick={() => {
              saveCSV();
            }}
          >
            {t("coverage.export.button")}
          </Button>
          <span>{t("coverage.export.description")}</span>

          <Button
            onClick={() => {
              loadCSV();
            }}
          >
            {t("coverage.import.button")}
          </Button>
          <span>{t("coverage.import.description")}</span>

          <Button
            onClick={() => {
              loadDefault();
            }}
          >
            {t("coverage.reset.button")}
          </Button>
          <span>{t("coverage.reset.description")}</span>
        </div>
      )}
      <p className="f4 b" hidden={!statusText} ref={statusRef}>
        {statusText}
      </p>
      <p className="flex gap1 items-center">
        <IconArrowLeft className="w1 h1" aria-hidden="true" />
        <Link
          to={`/offense/${offenseParams}`}
          className="underline fg-link br1 focus-outline"
        >
          {t("coverage.back")}
        </Link>
      </p>
    </main>
  );
}
