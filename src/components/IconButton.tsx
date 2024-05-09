import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      className={classNames(className, styles.root, "focus-tab")}
      {...props}
    />
  );
}
