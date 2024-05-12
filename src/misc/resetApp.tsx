import { unregisterServiceWorker } from "./unregisterServiceWorker";

export async function resetApp(): Promise<void> {
  try {
    localStorage.clear();
    sessionStorage.clear();
    await unregisterServiceWorker();
  } finally {
    location.reload();
  }
}
