import Papa from "papaparse";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Spinner } from "../components/Spinner";
import { useTypeCount } from "../hooks/useTypeCount";
import {
  Type,
  objectToCoverageType,
  reverseClosestLookup,
  typesFromUserInput,
} from "../misc/data-types";
import { pickFile } from "../misc/pickFile";
import { saveFile } from "../misc/saveFile";
import styles from "./ScreenWeaknessCoverage.module.css";
import { Icon } from "../components/Icon";
import { useAppContext } from "../hooks/useAppContext";

export function ScreenWeaknessCoverage(): ReactNode {
  const { setCoverageTypes, fallbackCoverageTypes, isLoading } =
    useAppContext();
  const { t } = useTranslation();
  const [statusText, setStatusText] = useState("");
  const [typeCount] = useTypeCount();

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
      },
    );
    saveFile({
      filename: t("coverage.filename"),
      type: "text/csv",
      data: csv,
    });
    setStatusText(t("coverage.status.exported"));
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
      setStatusText(
        result.errors
          .map((err) => {
            const row = err.row ? err.row + 2 : "?";
            return `Row ${row}: ${err.message}`;
          })
          .join("\n"),
      );
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
      }),
    );
    setCoverageTypes(newCoverageTypes);
  }

  function loadDefault() {
    setStatusText(t("coverage.status.reset"));
    setCoverageTypes(fallbackCoverageTypes);
  }

  return (
    <main className="center content-narrow">
      <Flex direction="column" gap="large" padding="large">
        <Flex gap="medium" />

        <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
          {t("coverage.heading")}
        </FancyText>

        <FancyText tag="p">{t("coverage.paragraph1")}</FancyText>

        <FancyText tag="p">{t("coverage.paragraph2")}</FancyText>

        <FancyText tag="p">{t("coverage.paragraph3")}</FancyText>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.buttonGrid}>
            <Button onClick={saveCSV}>{t("coverage.export.button")}</Button>
            <span>{t("coverage.export.description")}</span>

            <Button onClick={loadCSV}>{t("coverage.import.button")}</Button>
            <span>{t("coverage.import.description")}</span>

            <Button onClick={loadDefault}>{t("coverage.reset.button")}</Button>
            <span>{t("coverage.reset.description")}</span>
          </div>
        )}

        {statusText && (
          <FancyText tag="pre" fontSize="large" fontWeight="medium">
            {statusText}
          </FancyText>
        )}

        <Divider />

        <FancyText tag="p" fontSize="large" fontWeight="medium">
          <Icon name="arrowLeft" />{" "}
          <FancyLink to="/offense/">{t("coverage.back")}</FancyLink>
        </FancyText>
      </Flex>
    </main>
  );
}
