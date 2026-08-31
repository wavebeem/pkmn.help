import { ReactNode } from "react";
import styles from "./PlainBadge.module.css";

interface PlainBadgeProps {
  children: ReactNode;
  width?: "regular" | "full";
}

export function PlainBadge({
  children,
  width = "regular",
}: PlainBadgeProps): ReactNode {
  return (
    <div className={styles.root} data-width={width}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
