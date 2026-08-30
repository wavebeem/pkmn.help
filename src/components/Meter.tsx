import styles from "./Meter.module.css";
import { clamp } from "../misc/clamp";
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
  color = "var(--color-tertiary)",
  background = "var(--color-bg-ghost)",
}: MeterProps): ReactNode {
  const fillPercent = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
  let trackGap = "var(--padding1)";
  if (fillPercent === 0 || fillPercent === 100) {
    trackGap = "0px";
  }
  const vars = customProperties({
    "--meter-color": color,
    "--meter-color-bg": background,
    "--meter-fill-width": fillPercent + "%",
    "--meter-track-gap": trackGap,
  });
  return (
    <div className={styles.root} style={vars}>
      <div className={styles.fill}></div>
      <div className={styles.track}></div>
      <div className={styles.stop}></div>
    </div>
  );
}
