import classNames from "classnames";
import * as React from "react";

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label: string;
  helpText?: string;
}

export function Select({
  label,
  "aria-label": ariaLabel = label,
  helpText,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && <div className="b pb1">{label}</div>}
      <div className="Select">
        <select {...props} aria-label={ariaLabel} className={baseClasses} />
      </div>
      {helpText && <p className="ma0 pt1 fg3 f6">{helpText}</p>}
    </div>
  );
}

const baseClasses = classNames(
  "db w-100",
  "no-underline",
  "ba br2 pa2 pr5",
  "f5",
  "SimpleFocus",
  "border1 button-shadow button-bg button-bg-hover color-inherit"
);
