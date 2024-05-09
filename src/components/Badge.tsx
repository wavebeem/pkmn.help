import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "../misc/colors";
import { Type } from "../misc/data-types";
import styles from "./Badge.module.css";
import { customProperties } from "../misc/customProperties";

interface BadgeProps {
  type: Type;
}

export function Badge({ type }: BadgeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={styles.badgeContainer}
      data-type={type}
      style={customProperties({
        "--type-color": typeColor(type),
        "--type-color-bg": typeColorBG(type),
        "--type-color-border": typeColorBorder(type),
      })}
    >
      <div className={styles.badgeLabel}>{t(`types.${type}`)}</div>
    </div>
  );
}
