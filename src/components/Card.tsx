import { ReactNode } from "react";
import styles from "./Card.module.css";

export type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps): ReactNode {
  return <div className={styles.Card}>{children}</div>;
}
