import { useSyncExternalStore } from "react";

// One shared MutationObserver for every subscriber, instead of each caller
// (e.g. dozens of color swatches) spinning up its own.
let version = 0;
const listeners = new Set<() => void>();
let observer: MutationObserver | undefined;

function ensureObserver(): void {
  if (observer) {
    return;
  }
  observer = new MutationObserver(() => {
    version++;
    for (const listener of listeners) {
      listener();
    }
  });
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
}

function subscribe(listener: () => void): () => void {
  ensureObserver();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): number {
  return version;
}

// Bumps whenever `data-theme` changes on <html>, for components whose
// colors come from `light-dark()` and need to re-read computed styles.
export function useThemeChangeSignal(): number {
  return useSyncExternalStore(subscribe, getSnapshot);
}
