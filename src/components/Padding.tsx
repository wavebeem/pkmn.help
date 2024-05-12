import { ReactNode } from "react";
import styles from "./Padding.module.css";

export type PaddingProps = {
  size: "small" | "medium" | "large";
};

export function Padding({ size }: PaddingProps): ReactNode {
  return <div className={styles.Padding} data-size={size} />;
}
