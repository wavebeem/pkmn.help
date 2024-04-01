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
    <button
      type="button"
      data-state={state}
      aria-disabled={disabled}
      className={classNames(
        "relative",
        "active-darken",
        "pv1 ph3",
        "no-underline",
        "focus-outline",
        "br-pill ba",
        state === "default" && ["fg1", "bg2", "border1"],
        state === "copied" && ["fg1", "bg1", "border2"]
      )}
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
    </button>
  );
}
