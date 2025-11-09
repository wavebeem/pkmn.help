import { ReactNode } from "react";
import styles from "./PlainBadge.module.css";

interface PlainBadgeProps {
  children: ReactNode;
  size?: "regular" | "full-width";
}

export function PlainBadge({
  children,
  size = "regular",
}: PlainBadgeProps): ReactNode {
  return (
    <div className={styles.root} data-size={size}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
