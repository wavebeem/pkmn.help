import purgecss from "@fullhuman/postcss-purgecss";
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const config: UserConfigExport = {
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      VitePWA({
        mode: env.mode !== "development" ? "production" : "development",
        includeAssets: ["data-pkmn.json", "locales/*.json"],
      }),
    ],
  };
  if (env.mode !== "development") {
    config.css = {
      postcss: {
        plugins: [
          purgecss({
            content: ["./index.html", "./src/**/*.{ts,tsx,js,html}"],
          }),
        ],
      },
    };
  }
  return config;
});
