import classNames from "classnames";
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
      className={classNames("type-bg", "br2", "f5 tc", styles.badgeContainer)}
      data-type={type}
      style={customProperties({
        "--type-color": typeColor(type),
        "--type-color-bg": typeColorBG(type),
        "--type-color-border": typeColorBorder(type),
      })}
    >
      <div
        className={classNames(
          "br1 ba b--transparent white truncat weight-normal",
          styles.badgeLabel
        )}
        data-type={type}
      >
        {t(`types.${type}`)}
      </div>
    </div>
  );
}
