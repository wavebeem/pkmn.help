import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "tertiary";
  size?: "default" | "small";
};

export function IconButton({
  className,
  variant = "default",
  size = "default",
  ...props
}: IconButtonProps): ReactNode {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className={clsx(className, styles.root, "focus-toggle")}
      {...props}
    />
  );
}
