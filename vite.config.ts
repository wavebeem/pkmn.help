import purgecss from "@fullhuman/postcss-purgecss";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { Plugin } from "postcss";
import { defineConfig, UserConfigExport } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const config: UserConfigExport = {
    build: {
      sourcemap: true,
    },
    plugins: [
      reactRefresh(),
      VitePWA({
        mode: env.mode !== "development" ? "production" : "development",
        includeAssets: ["data-pkmn.json", "svg/*.svg", "favicon-*.png"],
        manifest: {
          name: "Pokémon Type Calculator",
          short_name: "pkmn.help",
          description:
            "A Pokémon type calculator to show strengths/weaknesses of different type combinations",
          theme_color: "#ffffff",
          icons: [
            {
              src: "favicon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "favicon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "favicon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
  };
  if (env.mode !== "development") {
    config.css = {
      postcss: {
        plugins: [
          purgecss({
            content: ["./index.html", "./src/**/*.{ts,tsx,js,html}"],
          }) as Plugin,
        ],
      },
    };
  }
  return config;
});
