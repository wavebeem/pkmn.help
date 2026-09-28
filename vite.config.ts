import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { assertDevOnlyIsLazy } from "./vite/assertDevOnlyIsLazy";
import { servePrettyUrls } from "./vite/servePrettyUrls";
import { translations } from "./vite/translations";

function pwaIcon(kind: "regular" | "maskable", size: number) {
  const iconVersion = 8;
  return {
    src: `/app-icon-${kind}-${size}.png?v=${iconVersion}`,
    sizes: `${size}x${size}`,
    type: "image/png",
    ...(kind === "maskable" && { purpose: "maskable" }),
  };
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const config: UserConfigExport = {
    server: {
      port: 1510,
    },
    preview: {
      port: 1510,
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // Group all third-party code into one chunk with a content hash that
          // only changes when a dependency actually changes, so an
          // app-code-only deploy doesn't force returning visitors to
          // re-download unchanged vendor code. Matching ALL of node_modules
          // (rather than a narrow subset) is what makes this safe: there's no
          // leftover shared module for Rollup to ambiguously place on either
          // side. See vite/assertDevOnlyIsLazy.ts for why a narrow/partial
          // manualChunks predicate is dangerous.
          manualChunks(id) {
            const normalized = id.replaceAll("\\", "/");
            if (normalized.includes("/node_modules/")) {
              return "vendor";
            }
          },
        },
      },
    },
    css: {
      modules: {
        // Create a more descriptive name that's easier to map back to the
        // actual source file for easier debugging
        generateScopedName: "[name]__[local]--[hash:base64:5]",
      },
    },
    plugins: [
      react(),
      translations(),
      servePrettyUrls(),
      assertDevOnlyIsLazy(),
      VitePWA({
        mode: env.mode !== "development" ? "production" : "development",
        registerType: "prompt",
        manifest: {
          name: "PKMN.help",
          short_name: "PKMN.help",
          lang: "en",
          start_url: "/",
          orientation: "any",
          icons: [
            ...[16, 32, 180, 192, 512].map((size) => pwaIcon("regular", size)),
            ...[180, 192, 512].map((size) => pwaIcon("maskable", size)),
          ],
          theme_color: "#93000c",
          background_color: "#151311",
          display: "standalone",
        },
        // These files are downloaded in the background automatically on first
        // page load and stored in the service worker cache.
        includeAssets: [
          "data-pkmn.json",
          "locales/*.json",
          "app-logo.svg",
          "app-icon-regular-*.png",
          "app-icon-*.png",
          "fonts/*.woff2",
        ],
        workbox: {
          // These files are excluded from the service worker cache. Given there
          // are over 1000 images, we don't want to cache them all, much less
          // force the user to download them on first page load. Translations
          // should be downloaded by very few users, so we don't want to cache
          // them either.
          navigateFallbackDenylist: [
            /^\/assets\//,
            /^\/translations\//,
            /^\/img\//,
            /^\/cry\//,
            /^\/p\//,
            /^\/changelog\//,
            /^\/licenses\//,
            /^\/credits\//,
          ],
          // Dev-only and static pages shouldn't get cached in the service
          // worker. The internal-only "/_/" screens (see src/components/
          // App.tsx) are never statically imported, so Vite's automatic
          // code-splitting names their async chunks after the source file (e.g.
          // "ScreenDevIndex-[hash].js"). Match on that instead of forcing them
          // into a manually-named chunk, which previously caused Rollup to
          // sweep shared deps (including React) into that chunk and made it
          // load unconditionally on every page view. This led to an outage
          // because booting depended on a file that wasn't in the SW cache and
          // also didn't exist on the server any more.
          globIgnores: ["**/ScreenDev*.{js,css}", "changelog/**", "credits/**"],
        },
      }),
    ],
  };
  return config;
});
