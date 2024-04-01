import classNames from "classnames";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        className,
        "active-darken",
        "no-underline",
        "ba br2",
        "f5",
        "focus-simple",
        "pv2 ph3",
        !disabled && baseClasses,
        disabled && disabledClasses
      )}
    />
  );
}

const baseClasses = classNames(
  "border1 button-shadow button-bg button-bg-hover color-inherit"
);

const disabledClasses = classNames("border3 fg4 bg-transparent no-pointer");
