import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { purgePlugin } from "./purge-plugin";
// import purgeCSS from "rollup-plugin-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    purgePlugin(),
    // purgeCSS({
    //   content: ["index.html"],
    // }),
  ],
});
