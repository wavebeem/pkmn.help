import styles from "./Meter.module.css";
import { customProperties } from "../misc/customProperties";
import { ReactNode } from "react";

export interface MeterProps {
  variant?: "normal" | "companion";
  value: number;
  max: number;
  color?: string;
  background?: string;
}

export function Meter({
  variant = "normal",
  value,
  max,
  color = "var(--color-fg3)",
  background = "var(--color-border3)",
}: MeterProps): ReactNode {
  const vars = customProperties({
    "--meter-color": color,
    "--meter-color-bg": background,
    "--meter-width": (value / max) * 100 + "%",
  });
  return (
    <div className={styles.root} data-variant={variant} style={vars}>
      <div className={styles.fill}></div>
    </div>
  );
}
