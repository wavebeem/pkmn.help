import { OutputChunk } from "rollup";
import { Plugin } from "vite";

// Guards against a repeat of a real outage: Rollup's manualChunks can, under
// some conditions, sweep shared runtime code (even React itself) into a chunk
// it otherwise thinks is dynamic-import-only, which forces the main entry chunk
// to statically import that chunk. For the internal-only "/_/" screens (see
// src/components/App.tsx's "_" route) that's catastrophic: that chunk is
// deliberately excluded from the service worker precache (see the workbox
// globIgnores option in vite.config.ts), so a stale/expired CDN cache entry for
// it 404s. Since it'd be a hard dependency of the entry chunk, that 404 takes
// down the entire app, not just the internal dev route.
//
// This must stay true: the dev-screen chunks are reachable ONLY via the dynamic
// import() in App.tsx, never via a static "import" edge from any other chunk.
export function assertDevOnlyIsLazy(): Plugin {
  return {
    name: "assert-dev-only-is-lazy",
    generateBundle(_options, bundle) {
      const isScreenDevModuleId = (id: string): boolean =>
        id.replaceAll("\\", "/").includes("/src/screens/ScreenDev");
      // Check moduleIds (every source module actually bundled into the
      // chunk), not just facadeModuleId: a correctly-lazy chunk has a clean
      // single-file facade, but a chunk that accidentally merges the dev
      // screens with other code (the exact failure mode this guards
      // against) may not have one at all.
      const isDevOnlyChunk = (chunk: OutputChunk): boolean =>
        chunk.moduleIds.some(isScreenDevModuleId);
      const chunks = Object.values(bundle).filter(
        (output): output is OutputChunk => output.type === "chunk",
      );
      const devOnlyFileNames = new Set(
        chunks.filter(isDevOnlyChunk).map((chunk) => chunk.fileName),
      );
      if (devOnlyFileNames.size === 0) {
        this.error(
          "Expected to find chunks for the internal-only ScreenDev* " +
            "screens, but found none. Did they move or get renamed? " +
            "Update this check (and the globIgnores pattern in " +
            "vite.config.ts) to match.",
        );
      }
      for (const chunk of chunks) {
        if (devOnlyFileNames.has(chunk.fileName)) {
          continue;
        }
        const staticallyImportedDevOnlyFile = chunk.imports.find((file) =>
          devOnlyFileNames.has(file),
        );
        if (staticallyImportedDevOnlyFile) {
          this.error(
            `${chunk.fileName} statically imports the internal-only ` +
              `${staticallyImportedDevOnlyFile} chunk. That chunk must ` +
              "stay reachable only via dynamic import(), or it'll be " +
              "bundled into every visitor's initial load despite being " +
              "excluded from the service worker precache.",
          );
        }
      }
    },
  };
}
