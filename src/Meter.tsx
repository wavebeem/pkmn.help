import * as React from "react";
import styles from "./Meter.module.css";

export interface MeterProps {
  value: number;
  max: number;
  color?: string;
}

export function Meter({ value, max, color = "var(--color-fg3)" }: MeterProps) {
  return (
    <div className={`flex h1 w-100 ${styles.meter}`}>
      <div
        className={styles.meterFill}
        style={{
          ["--meter-color" as any]: color,
          ["--meter-width" as any]: (value / max) * 100 + "%",
        }}
      ></div>
    </div>
  );
}
