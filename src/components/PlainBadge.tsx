import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./PlainBadge.module.css";

interface PlainBadgeProps {
  children: ReactNode;
}

export function PlainBadge({ children }: PlainBadgeProps) {
  return (
    <div className={styles.PlainBadge}>
      <div className={classNames(styles.PlainBadge_content, "truncate")}>
        {children}
      </div>
    </div>
  );
}
