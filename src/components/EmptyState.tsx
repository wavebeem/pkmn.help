import * as React from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  children: React.ReactNode;
};

export function EmptyState({ children }: EmptyStateProps) {
  return <div className={styles.root}>{children}</div>;
}
