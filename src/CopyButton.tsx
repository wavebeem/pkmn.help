import classNames from "classnames";
import * as React from "react";
import styles from "./CopyButton.module.css";
import { sleep } from "./sleep";

export interface CopyButtonProps {
  text: string;
  children: React.ReactNode;
}

type State = "default" | "copied";

export function CopyButton({ text, children }: CopyButtonProps) {
  const [state, setState] = React.useState<State>("default");
  const disabled = state === "copied";
  return (
    <a
      data-state={state}
      aria-disabled={disabled}
      className={classNames(
        "relative",
        "active-darken",
        "pv1 ph2",
        "no-underline",
        "focus-outline",
        "br-pill ba",
        state === "default" && ["fg-link", "border1"],
        state === "copied" && ["fg1", "bg1", "border2"]
      )}
      href={text}
      target="_blank"
      onClick={async (event) => {
        try {
          event.preventDefault();
          if (disabled) {
            return;
          }
          await navigator.clipboard.writeText(text);
          setState("copied");
          await sleep(250);
        } finally {
          setState("default");
        }
      }}
    >
      {children}
    </a>
  );
}
