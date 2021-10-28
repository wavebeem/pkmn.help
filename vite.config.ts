import purgecss from "@fullhuman/postcss-purgecss";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { Plugin } from "postcss";
import { defineConfig, UserConfigExport } from "vite";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const config: UserConfigExport = {
    build: {
      sourcemap: true,
    },
    plugins: [reactRefresh()],
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
