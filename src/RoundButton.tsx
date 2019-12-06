import React from "react";
import classnames from "classnames";

export function RoundButton(props: React.ButtonHTMLAttributes<never>) {
  return (
    <button
      {...props}
      className={classnames(
        "db",
        "ba br-pill pv1 ph2",
        "b f5",
        "chunky-focus",
        "active-squish",
        props.disabled
          ? "b--black-10 black-20 bg-transparent"
          : "b--black-30 button-shadow bg-white hover-bg-washed-blue"
      )}
    />
  );
}
