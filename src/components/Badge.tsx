import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "../misc/colors";
import { Type } from "../misc/data-types";
import styles from "./Badge.module.css";
import { customProperties } from "../misc/customProperties";
import { ReactNode } from "react";

interface BadgeProps {
  type: Type;
}

export function Badge({ type }: BadgeProps): ReactNode {
  const { t } = useTranslation();
  return (
    <div
      className={styles.badge}
      data-type={type}
      style={customProperties({
        "--type-color": typeColor(type),
        "--type-color-bg": typeColorBG(type),
        "--type-color-border": typeColorBorder(type),
      })}
    >
      <div className={styles.swatch} />
      <div className={styles.label}>{t(`types.${type}`)}</div>
    </div>
  );
}
