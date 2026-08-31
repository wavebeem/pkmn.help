import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "default" | "small";
};

export function IconButton({
  className,
  size = "default",
  ...props
}: IconButtonProps): ReactNode {
  return (
    <button
      data-size={size}
      className={clsx(className, styles.root, "focus-toggle")}
      {...props}
    />
  );
}
