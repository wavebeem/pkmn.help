import { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  heading: ReactNode;
  children: ReactNode;
}

export function Section({ heading, children }: SectionProps): ReactNode {
  return (
    <section className={styles.section}>
      {heading}
      {children}
    </section>
  );
}
