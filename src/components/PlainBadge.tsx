import { ReactNode } from "react";
import styles from "./PlainBadge.module.css";

interface PlainBadgeProps {
  children: ReactNode;
}

export function PlainBadge({ children }: PlainBadgeProps) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
