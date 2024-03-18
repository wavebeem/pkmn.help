import classNames from "classnames";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(className, baseClasses, "pv2 ph3")}
    />
  );
}

const baseClasses = classNames(
  "active-darken",
  "no-underline",
  "ba br2",
  "f5",
  "focus-simple",
  "border1 button-shadow button-bg button-bg-hover color-inherit"
);
