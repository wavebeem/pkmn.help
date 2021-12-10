import classNames from "classnames";
import * as React from "react";

export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={classNames(className, baseClasses)} />;
}

const baseClasses = classNames(
  "no-underline",
  "ba br2 pv2 ph3",
  "b f5",
  "SimpleFocus",
  "border1 button-shadow button-bg button-bg-hover color-inherit active-squish"
);
