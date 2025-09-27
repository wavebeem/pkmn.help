import { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  children: ReactNode;
  borderless?: boolean;
};

export function EmptyState({
  children,
  borderless = false,
}: EmptyStateProps): ReactNode {
  return (
    <div className={styles.root} data-borderless={String(borderless)}>
      {children}
    </div>
  );
}
