import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "tertiary";
};

export function IconButton({
  className,
  variant = "default",
  ...props
}: IconButtonProps): ReactNode {
  return (
    <button
      data-variant={variant}
      className={clsx(className, styles.root, "focus-toggle")}
      {...props}
    />
  );
}
