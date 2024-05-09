import { ReactNode } from "react";
import styles from "./CollapsibleSection.module.css";

interface CollapsibleSectionProps {
  initiallyOpen?: boolean;
  heading: ReactNode;
  children: ReactNode;
}

export function CollapsibleSection({
  initiallyOpen = false,
  heading,
  children,
}: CollapsibleSectionProps): JSX.Element {
  return (
    <details className={styles.details} open={initiallyOpen}>
      <summary className="pointer no-select active-darken">{heading}</summary>
      {children}
    </details>
  );
}
