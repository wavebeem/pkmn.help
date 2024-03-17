import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import { Type } from "./data-types";
import styles from "./Badge.module.css";

interface BadgeProps {
  type: Type;
}

export function Badge({ type }: BadgeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        "type-bg",
        "br2",
        "b f5 lh-title tc",
        styles.badgeContainer
      )}
      data-type={type}
      style={{
        ["--type-color" as any]: typeColor(type),
        ["--type-color-bg" as any]: typeColorBG(type),
        ["--type-color-border" as any]: typeColorBorder(type),
      }}
    >
      <div
        className={classNames(
          "br1 ba b--transparent white truncate",
          styles.badgeLabel
        )}
        data-type={type}
      >
        {t(`types.${type}`)}
      </div>
    </div>
  );
}
