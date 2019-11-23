import React from "react";
import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<never> {}

function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={classnames(
        "db w-100",
        "ba br3",
        "pv3 ph4",
        "b f3",
        "chunky-focus",
        "active-squish",
        props.disabled
          ? "b--black-10 black-20 bg-transparent"
          : "b--black-30 button-shadow bg-white hover-bg-washed-blue"
      )}
    />
  );
}

Button.displayName = "Button";

export default Button;
