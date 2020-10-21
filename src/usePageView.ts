import * as React from "react";
import { sendPageView } from "./ga";

export function usePageView(): void {
  React.useEffect(() => {
    sendPageView();
  }, []);
}
