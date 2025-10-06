import { isAndroid } from "../misc/sniffing";

// (2025-10-06) Android Chrome ignores <hr> inside <select> entirely. Android
// Firefox renders a completely blank item instead. Both look terrible. A fake
// divider doesn't look good either, but at least it improves usability.
let supportsDividers = !isAndroid;

export function SelectDivider() {
  if (supportsDividers) {
    return <hr />;
  }
  return <option disabled>{"•—•—•—•—•—•"}</option>;
}
