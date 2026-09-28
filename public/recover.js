// Classic script, loaded before the main module script, so it still runs if
// that module fails to load.
//
// Failure mode: a stale service worker cache serves the HTML shell in place of
// a hashed JS/CSS asset (e.g. after a deploy removes the old file). The browser
// refuses to run it as a module, the app never boots, and the static "requires
// JavaScript" fallback is stuck forever with no recovery path.
//
// Fix: detect that failure, wipe the SW + cache storage, reload once.
{
  const recoveryKey = "FallbackContent_recoveredFromStaleCache";

  function logRejections(results) {
    for (const result of results) {
      if (result.status === "rejected") {
        // eslint-disable-next-line no-console
        console.error(result.reason);
      }
    }
  }

  async function unregisterServiceWorkers() {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      const results = await Promise.allSettled(
        registrations.map((registration) => registration.unregister()),
      );
      logRejections(results);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  async function clearCaches() {
    try {
      const keys = await caches.keys();
      const results = await Promise.allSettled(
        keys.map((key) => caches.delete(key)),
      );
      logRejections(results);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function reloadWithCacheBust(now) {
    // Unique URL bypasses any cache layer still active if unregistering
    // didn't take effect in time.
    const url = new URL(location.href);
    url.searchParams.set("recover", String(now.getTime()));
    location.replace(url.href);
  }

  async function recover() {
    const now = new Date();
    sessionStorage.setItem(recoveryKey, now.toISOString());
    await unregisterServiceWorkers();
    await clearCaches();
    reloadWithCacheBust(now);
  }

  function handleError(event) {
    if (sessionStorage.getItem(recoveryKey)) {
      return;
    }
    // There's no useful standardized error message here for module load
    // failures. Just check which element it failed on.
    const element = event.target;
    const looksLikeStaleCacheFailure =
      element && element.localName === "script" && element.type === "module";
    if (!looksLikeStaleCacheFailure) {
      return;
    }
    recover();
  }

  // Script loads before this button is parsed, so we handle via delegation
  function handleClick(event) {
    if (event.target.closest("#fallback-content-recover-button")) {
      recover();
    }
  }

  // Intentionally not removed based on `signal` since non-initial scripts could
  // fail to load and we should try to handle those as well.
  addEventListener("error", handleError, {
    // Resource load errors don't bubble
    capture: true,
  });

  // Remove click listener once React boots and removes our fallback content
  const controller = new AbortController();
  const { signal } = controller;
  addEventListener("click", handleClick, { signal });

  document.addEventListener("DOMContentLoaded", () => {
    const appElement = document.querySelector("#app");
    if (!appElement) {
      return;
    }
    const observer = new MutationObserver(() => {
      if (appElement.querySelector(".fallback-content")) {
        return;
      }
      observer.disconnect();
      controller.abort();
      //
      // App booted, so any prior attempt worked. Reset the one-shot guard:
      //
      // - handleError stays attached for the whole session
      //
      // - a later, unrelated failure (e.g. a future deploy breaking a
      //   lazy-loaded chunk) deserves its own attempt
      //
      sessionStorage.removeItem(recoveryKey);
    });
    observer.observe(appElement, { childList: true });
  });
}
