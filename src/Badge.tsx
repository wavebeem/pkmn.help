import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import { Type } from "./data-types";

interface BadgeProps {
  type: Type;
}

export function Badge({ type }: BadgeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        "type-bg",
        "ba border-vibrant",
        "br2",
        "b f5 lh-title tc"
      )}
      style={{
        padding: 2,
        ["--type-color" as any]: typeColor(type),
      }}
    >
      <div
        className="br1 ba b--transparent white truncate"
        style={{
          paddingLeft: 4,
          paddingRight: 4,
          background: typeColorBG(type),
          borderColor: typeColorBorder(type),
        }}
      >
        {t(`types.${type}`)}
      </div>
    </div>
  );
}
