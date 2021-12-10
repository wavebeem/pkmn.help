import classNames from "classnames";
import * as React from "react";

export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<never>) {
  return (
    <button
      {...props}
      tabIndex={0}
      onClick={props.onClick}
      className={classNames(
        className,
        baseClasses,
        "border1 button-shadow button-bg button-bg-hover color-inherit active-squish"
      )}
    />
  );
}

const baseClasses = classNames(
  "no-underline",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus"
);
