import * as React from "react";
import styles from "./Meter.module.css";
import { customProperties } from "../customProperties";

export interface MeterProps {
  value: number;
  max: number;
  color?: string;
}

export function Meter({ value, max, color = "var(--color-fg3)" }: MeterProps) {
  const vars = customProperties({
    "--meter-color": color,
    "--meter-width": (value / max) * 100 + "%",
  });
  return (
    <div className={styles.Meter}>
      <div className={styles.Meter_fill} style={vars}></div>
    </div>
  );
}
