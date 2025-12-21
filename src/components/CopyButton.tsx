import { clsx } from "clsx";
import { ReactNode, useEffect, useState } from "react";
import styles from "./CopyButton.module.css";
import { sleep } from "../misc/sleep";
import { IconCheck, IconCopy } from "./icons";

export interface CopyButtonProps {
  text: string;
  children: ReactNode;
}

type State = "default" | "copied";

export function CopyButton({ text, children }: CopyButtonProps): ReactNode {
  const [state, setState] = useState<State>("default");
  const disabled = state === "copied";
  return (
    <button
      type="button"
      className={clsx("active-darken", "focus-tab", styles.root)}
      aria-disabled={disabled}
      onClick={async (event) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          setState("copied");
          await sleep(1000);
        } finally {
          setState("default");
        }
      }}
    >
      {state === "copied" ? <IconCheck size={16} /> : <IconCopy size={16} />}
      {children}
    </button>
  );
}
