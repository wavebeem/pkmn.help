import classNames from "classnames";
import * as React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

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
