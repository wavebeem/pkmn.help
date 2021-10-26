import purgecss from "@fullhuman/postcss-purgecss";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { Plugin } from "postcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ["./index.html", "./src/**/*.{ts,tsx,js,html}"],
        }) as Plugin,
      ],
    },
  },
  plugins: [reactRefresh()],
});
