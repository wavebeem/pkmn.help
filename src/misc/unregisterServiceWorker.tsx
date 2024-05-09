export async function unregisterServiceWorker() {
  try {
    for (const reg of await navigator.serviceWorker.getRegistrations()) {
      try {
        await reg.unregister();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Failed to unregister service worker", err);
      }
    }
  } finally {
    location.reload();
  }
}
