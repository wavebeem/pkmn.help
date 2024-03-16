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
        "b f5 lh-title tc",
        type === Type.stellar && "type-stellar"
      )}
      style={{
        padding: 2,
        ["--type-color" as any]: typeColor(type),
      }}
    >
      <div
        className={classNames(
          "br1 ba b--transparent white truncate",
          type === Type.stellar ? "type-stellar-label" : "type-any-label"
        )}
        style={{
          paddingLeft: 4,
          paddingRight: 4,
          ["--type-color-bg" as any]: typeColorBG(type),
          ["--type-color-border" as any]: typeColorBorder(type),
        }}
      >
        {t(`types.${type}`)}
      </div>
    </div>
  );
}
