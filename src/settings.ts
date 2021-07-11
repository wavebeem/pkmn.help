export const PUBLIC_PATH = new URL(
  import.meta.env.BASE_URL,
  window.location.href
).href;
