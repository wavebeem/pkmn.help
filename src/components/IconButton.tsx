import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

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
