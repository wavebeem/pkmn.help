import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  className,
  ...props
}: IconButtonProps): ReactNode {
  return (
    <button
      className={clsx(className, styles.root, "focus-toggle")}
      {...props}
    />
  );
}
