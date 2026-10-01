import { useState, useEffect } from "react";
import { unregisterServiceWorker } from "../misc/unregisterServiceWorker";

type FetchJSONResponse<T> =
  | { type: "pending" }
  | { type: "loading" }
  | { type: "done"; data: T };

// One-shot guard so a genuinely broken JSON file (not just a stale SW cache)
// can't reload the page forever.
const recoveryKey = "useFetchJSON_recoveredFromStaleCache";

export function useFetchJSON<T = unknown>(url: string): FetchJSONResponse<T> {
  const [state, setState] = useState<FetchJSONResponse<T>>({
    type: "pending",
  });
  const [attemptTime, setAttemptTime] = useState(Date.now());

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch(url);
        const data: T = await resp.json();
        // A later unrelated failure deserves its own recovery attempt.
        sessionStorage.removeItem(recoveryKey);
        setState({ type: "done", data });
      } catch (err) {
        // Bad JSON here usually means a stale SW cache served index.html
        // instead. Same recovery as public/recover.js, triggered from fetch()
        // instead of a script-tag error event.
        if (
          err instanceof SyntaxError &&
          !sessionStorage.getItem(recoveryKey)
        ) {
          sessionStorage.setItem(recoveryKey, new Date().toISOString());
          await unregisterServiceWorker();
          return;
        }
        // eslint-disable-next-line no-console
        console.warn(`Failed to download ${url}`, err);
        const retryDelay = 60 * 1000;
        // Retry every minute until the JSON finishes downloading
        setTimeout(() => {
          setAttemptTime(Date.now());
        }, retryDelay);
      }
    }
    if (url) {
      load();
    } else {
      setState({ type: "pending" });
    }
  }, [url, attemptTime]);

  return state;
}
