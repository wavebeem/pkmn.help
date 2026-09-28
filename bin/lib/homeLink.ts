// Shared "back to the app" link for standalone static pages (changelog,
// licenses, credits) that live outside the bundle and aren't part of the app's

import { html } from "./html.js";

// own router.
export const homeLink = html`<nav><a href="/">Back</a></nav>`;
