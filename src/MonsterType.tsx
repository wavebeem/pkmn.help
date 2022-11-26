import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import { Type } from "./data-types";

interface MonsterTypeProps {
  type: Type;
}

export function MonsterType({ type }: MonsterTypeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        "type-bg",
        "ttc tc flex",
        "lh-title b",
        "br2 ba border-vibrant f6"
      )}
      style={{
        padding: 2,
        ["--type-color" as any]: typeColor(type),
      }}
    >
      <div
        className="white w-100 br1 ba b--black-10 ph2 nowrap"
        style={{
          background: typeColorBG(type),
          borderColor: typeColorBorder(type),
        }}
      >
        {t(`types.${type}`)}
      </div>
    </div>
  );
}
