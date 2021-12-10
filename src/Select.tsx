import classNames from "classnames";
import * as React from "react";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={classNames(className, "Select")}>
      <select {...props} className={baseClasses} />
    </div>
  );
}

const baseClasses = classNames(
  "db w-100",
  "no-underline",
  "ba br2 pa2 pr4",
  "b f5",
  "SimpleFocus",
  "border1 button-shadow button-bg button-bg-hover color-inherit"
);
