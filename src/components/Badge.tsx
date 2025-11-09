import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "../misc/colors";
import { Type } from "../misc/data-types";
import styles from "./Badge.module.css";
import { customProperties } from "../misc/customProperties";
import { ReactNode } from "react";
import { PlainBadge } from "./PlainBadge";

interface BadgeProps {
  type: Type;
  size?: "small" | "medium";
}

export function Badge({ type, size = "medium" }: BadgeProps): ReactNode {
  const { t } = useTranslation();
  // TODO: Remove this...
  if (type === "none") {
    return <PlainBadge>{t(`types.${type}`)}</PlainBadge>;
  }
  return (
    <div
      className={styles.badge}
      data-type={type}
      data-size={size}
      style={customProperties({
        "--type-color": typeColor(type),
        "--type-color-bg": typeColorBG(type),
        "--type-color-border": typeColorBorder(type),
      })}
    >
      <div className={styles.label}>{t(`types.${type}`)}</div>
    </div>
  );
}
