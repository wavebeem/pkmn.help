import purgecss from "@fullhuman/postcss-purgecss";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { Plugin } from "postcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ["./src/**/*.{ts,tsx,js}"],
        }) as Plugin,
      ],
    },
  },
  plugins: [reactRefresh()],
});
