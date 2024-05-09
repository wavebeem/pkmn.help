import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        className,
        styles.root,
        "active-darken",
        "focus-simple"
      )}
    />
  );
}
