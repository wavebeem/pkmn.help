import { ReactNode } from "react";
import styles from "./TabBar.module.css";

export type TabBarProps = {
  children: ReactNode;
};

export function TabBar({ children }: TabBarProps): ReactNode {
  return <div className={styles.root}>{children}</div>;
}
