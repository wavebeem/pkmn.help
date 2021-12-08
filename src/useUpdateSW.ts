import * as React from "react";

interface UpdateSW {
  type: "updating" | "pending";
  eventType: string;
  date: string;
}

export function useUpdateSW(): UpdateSW {
  // TODO: Don't check too frequently
  const [state, setState] = React.useState<UpdateSW>({
    type: "pending",
    eventType: "",
    date: new Date().toISOString(),
  });
  React.useEffect(() => {
    const update = async (event: Event) => {
      if (document.hidden) {
        return;
      }
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        try {
          setState({
            type: "updating",
            eventType: event.type,
            date: new Date().toISOString(),
          });
          await reg.update();
        } finally {
          setState({
            type: "pending",
            eventType: event.type,
            date: new Date().toISOString(),
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
  }, []);
  return state;
}
