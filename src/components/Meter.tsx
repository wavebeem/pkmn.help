import styles from "./Meter.module.css";
import { customProperties } from "../misc/customProperties";
import { ReactNode } from "react";

export interface MeterProps {
  value: number;
  max: number;
  color?: string;
}

export function Meter({
  value,
  max,
  color = "var(--color-fg3)",
}: MeterProps): ReactNode {
  const vars = customProperties({
    "--meter-color": color,
    "--meter-width": (value / max) * 100 + "%",
  });
  return (
    <div className={styles.root}>
      <div className={styles.fill} style={vars}></div>
    </div>
  );
}
