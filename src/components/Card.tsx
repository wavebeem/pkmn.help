import { ReactNode } from "react";
import styles from "./Card.module.css";

export type CardProps = {
  children: ReactNode;
  size?: "medium" | "small";
};

export function Card({ children, size }: CardProps): ReactNode {
  return (
    <div className={styles.Card} data-size={size}>
      {children}
    </div>
  );
}
