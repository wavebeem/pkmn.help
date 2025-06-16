import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  "aria-pressed": ariaPressed,
  ...props
}: ButtonProps): ReactNode {
  return (
    <button
      aria-pressed={ariaPressed}
      className={classNames(
        className,
        styles.root,
        "active-darken",
        ariaPressed === true || ariaPressed === "true"
          ? "focus-selected"
          : "focus-simple",
      )}
      {...props}
    />
  );
}
