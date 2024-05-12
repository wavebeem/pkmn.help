import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function IconButton({
  className,
  ...props
}: IconButtonProps): ReactNode {
  return (
    <button
      className={classNames(className, styles.root, "focus-tab")}
      {...props}
    />
  );
}
