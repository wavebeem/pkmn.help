import * as React from "react";
import styles from "./CollapsibleSection.module.css";

interface CollapsibleSectionProps {
  initiallyOpen?: boolean;
  heading: React.ReactNode;
  children: React.ReactNode;
}

export function CollapsibleSection({
  initiallyOpen = false,
  heading,
  children,
}: CollapsibleSectionProps): JSX.Element {
  return (
    <details className={styles.details} open={initiallyOpen}>
      <summary className="pointer no-select">{heading}</summary>
      {children}
    </details>
  );
}
