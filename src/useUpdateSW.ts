import * as React from "react";

interface UpdateSW {
  type: "updating" | "pending";
  eventType: string;
}

export function useUpdateSW(): UpdateSW {
  // TODO: Don't check too frequently
  const [state, setState] = React.useState<UpdateSW>({
    type: "pending",
    eventType: "",
  });
  React.useEffect(() => {
    const update = async (event: Event) => {
      if (document.hidden) {
        return;
      }
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        try {
          setState({ type: "updating", eventType: event.type });
          await reg.update();
        } finally {
          setState({ type: "pending", eventType: event.type });
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
