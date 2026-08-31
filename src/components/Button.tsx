import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "tonal" | "filled" | "outlined";
  size?: "default" | "small";
  iconOnly?: boolean;
};

export function Button({
  className,
  variant = "tonal",
  size = "default",
  iconOnly = false,
  "aria-pressed": ariaPressed,
  ...props
}: ButtonProps): ReactNode {
  return (
    <button
      aria-pressed={ariaPressed}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      className={clsx(
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
