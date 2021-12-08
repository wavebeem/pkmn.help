import * as React from "react";

interface UpdateSW {
  type: "updating" | "pending";
}

export function useUpdateSW(): UpdateSW {
  // TODO: Don't check too frequently
  const [state, setState] = React.useState<UpdateSW>({ type: "pending" });
  React.useEffect(() => {
    const update = async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        try {
          setState({ type: "updating" });
          await reg.update();
        } finally {
          setState({ type: "pending" });
        }
      }
    };
    addEventListener("focus", update);
    return () => {
      removeEventListener("focus", update);
    };
  }, []);
  return state;
}
