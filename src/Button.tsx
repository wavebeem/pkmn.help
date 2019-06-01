import * as React from "react";
import * as classnames from "classnames";

function buttonClass(disabled: boolean) {
  return classnames(
    "db w-100",
    "ba br3",
    "pv3 ph4",
    "b f3",
    "chunky-focus",
    "active-squish",
    disabled
      ? "b--black-10 black-20 bg-transparent"
      : "b--black-30 button-shadow bg-white hover-bg-washed-blue"
  );
}

interface ButtonProps {
  onClick(): void;
  disabled: boolean;
  children: any;
}

function Button(props: ButtonProps) {
  const { onClick, disabled, children } = props;
  const className = buttonClass(disabled);
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

Button.displayName = "Button";

export default Button;
