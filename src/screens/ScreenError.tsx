import { ReactNode, useState } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { resetApp } from "../misc/resetApp";
import styles from "./ScreenError.module.css";

function useCopyToClipboard(): {
  didCopy: boolean;
  copy: (text: string) => Promise<void>;
} {
  const [didCopy, setDidCopy] = useState(false);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setDidCopy(true);
    setTimeout(() => setDidCopy(false), 1000);
  }

  return { didCopy, copy };
}

export function ScreenError(): ReactNode {
  const error = useRouteError();
  const clip = useCopyToClipboard();

  if (isRouteErrorResponse(error)) {
    // Do something with error.data?
  }

  if (!(error instanceof Error)) {
    throw error;
  }

  const message = `
${error.name}: ${error.message}

## URL

${location.href}

## User agent

${navigator.userAgent}

## Local storage

${JSON.stringify(localStorage)}

## Session storage

${JSON.stringify(sessionStorage)}
`.trim();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.heading}>PKMN.help: Error</h1>
        <p>
          Please copy the error message below and send it to{" "}
          <a className={styles.link} href="mailto:pkmn@wavebeem.com">
            pkmn@wavebeem.com
          </a>
          .
        </p>
        <div className={styles.row}>
          <button
            type="button"
            className={styles.button}
            data-variant="outlined"
            onClick={() => void clip.copy(message)}
          >
            Copy error message
          </button>
          {clip.didCopy && <span>Copied!</span>}
        </div>
        <pre className={styles.pre}>{message}</pre>

        <p>Resetting the app may help:</p>
        <div>
          <button
            type="button"
            className={styles.button}
            data-variant="filled"
            onClick={resetApp}
          >
            Reset
          </button>
        </div>

        <p>You can try returning to the main page.</p>

        <p>
          <a className={styles.link} href="/">
            Back to main page
          </a>
        </p>
      </div>
    </div>
  );
}
