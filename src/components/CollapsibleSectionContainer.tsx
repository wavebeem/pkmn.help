import { ReactNode } from "react";
import styles from "./CollapsibleSectionContainer.module.css";

interface CollapsibleSectionContainerProps {
  children: ReactNode;
}

export function CollapsibleSectionContainer({
  children,
}: CollapsibleSectionContainerProps): ReactNode {
  return <div className={styles.root}>{children}</div>;
}
