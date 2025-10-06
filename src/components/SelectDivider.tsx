import { ReactNode } from "react";
import { isAndroid } from "../misc/sniffing";

// (2025-10-06) Android Chrome ignores <hr> inside <select> entirely. Android
// Firefox renders a completely blank item instead. Both look terrible. A fake
// divider doesn't look good either, but at least it improves usability.
const supportsDividers = !isAndroid;

export function SelectDivider(): ReactNode {
  if (supportsDividers) {
    return <hr />;
  }
  return <option disabled>{"•—•—•—•—•—•"}</option>;
}
