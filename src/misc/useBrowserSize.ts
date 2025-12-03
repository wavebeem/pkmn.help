import { useEffect, useState } from "react";

type Size = [number, number];

export function useBrowserSize(): Size {
  const [state, setState] = useState<Size>([0, 0]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    addEventListener(
      "resize",
      () => {
        setState([window.innerWidth, window.innerHeight]);
      },
      { signal },
    );
    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
