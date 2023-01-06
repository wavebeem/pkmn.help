// Documentation for import.meta.env variables
// https://vitejs.dev/guide/env-and-mode.html

export const publicPath = new URL(
  import.meta.env.BASE_URL,
  window.location.href
).href;
