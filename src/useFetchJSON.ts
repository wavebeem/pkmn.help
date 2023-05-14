import * as React from "react";

type FetchJSONResponse<T> =
  | { type: "pending" }
  | { type: "loading" }
  | { type: "done"; data: T };

export function useFetchJSON<T = unknown>(url: string): FetchJSONResponse<T> {
  const [state, setState] = React.useState<FetchJSONResponse<T>>({
    type: "pending",
  });
  const [attemptTime, setAttemptTime] = React.useState(Date.now());

  React.useEffect(() => {
    async function load() {
      try {
        const resp = await fetch(url);
        const data: T = await resp.json();
        setState({ type: "done", data });
      } catch (err) {
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
