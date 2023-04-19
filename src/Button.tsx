import classNames from "classnames";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "small";
}

export function Button({ className, size = "medium", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        className,
        baseClasses,
        size === "medium" ? "pv2 ph3" : "pv1 ph3"
      )}
    />
  );
}

const baseClasses = classNames(
  "no-underline",
  "ba br2",
  "f5",
  "focus-simple",
  "border1 button-shadow button-bg button-bg-hover color-inherit active-squish"
);
