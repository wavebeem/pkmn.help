import styles from "./Meter.module.css";
import { customProperties } from "../misc/customProperties";
import { ReactNode } from "react";

export interface MeterProps {
  value: number;
  max: number;
  color?: string;
  background?: string;
}

export function Meter({
  value,
  max,
  color = "var(--color-fg3)",
  background = "var(--color-bg-ghost)",
}: MeterProps): ReactNode {
  const vars = customProperties({
    "--meter-color": color,
    "--meter-color-bg": background,
    "--meter-width": (value / max) * 100 + "%",
  });
  return (
    <div className={styles.root} style={vars}>
      <div className={styles.fill}></div>
    </div>
  );
}
