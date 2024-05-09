import { unregisterServiceWorker } from "./unregisterServiceWorker";

export async function resetApp() {
  try {
    localStorage.clear();
    sessionStorage.clear();
    await unregisterServiceWorker();
  } finally {
    location.reload();
  }
}
