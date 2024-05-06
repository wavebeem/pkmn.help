import classNames from "classnames";
import * as React from "react";
import styles from "./PlainBadge.module.css";

interface PlainBadgeProps {
  children: React.ReactNode;
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
