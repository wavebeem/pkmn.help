import * as React from "react";

interface UpdateSW {
  type: "updating" | "pending";
  lastUpdateCheck: number;
}

const checkInterval = 10 * 60 * 1000;

export function useUpdateSW(): UpdateSW {
  const [state, setState] = React.useState<UpdateSW>({
    type: "pending",
    lastUpdateCheck: Date.now(),
  });
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      return;
    }
    const update = async () => {
      if (document.hidden) {
        return;
      }
      const date = new Date();
      if (date.valueOf() - state.lastUpdateCheck < checkInterval) {
        return;
      }
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        try {
          setState({
            type: "updating",
            lastUpdateCheck: date.valueOf(),
          });
          await reg.update();
        } catch (err) {
          console.error(err);
        } finally {
          setState({
            type: "pending",
            lastUpdateCheck: date.valueOf(),
          });
        }
      }
    };
    document.addEventListener("visibilitychange", update);
    document.addEventListener("focus", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      document.removeEventListener("focus", update);
    };
  }, [state]);
  return state;
}
