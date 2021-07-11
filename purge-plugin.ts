import { createFilter, FilterPattern } from "@rollup/pluginutils";
import { Plugin } from "vite";
import { PurgeCSS } from "purgecss";

interface PurgePluginOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
}

// TODO: This function is a mess. Refactor it a bit, please...
export function purgePlugin({
  include,
  exclude,
}: PurgePluginOptions = {}): Plugin {
  const filter = createFilter(include, exclude);
  return {
    name: "purge",
    async generateBundle(options, bundle) {
      // console.log(bundle);
      const files = Object.keys(bundle);
      const purge = new PurgeCSS();
      const content = [
        ...files
          .filter((f) => f.endsWith(".js"))
          .filter(filter)
          .map((f) => {
            const thing = bundle[f];
            const raw = thing.type === "chunk" ? thing.code : "";
            return { file: f, extension: "js", raw };
          }),
        ...files
          .filter((f) => f.endsWith(".html"))
          .filter(filter)
          .flatMap((f) => {
            const thing = bundle[f];
            if (thing.type === "asset" && typeof thing.source === "string") {
              return [{ file: f, extension: "html", raw: thing.source }];
            }
            return [];
          }),
      ];
      const css = [
        ...files
          .filter((f) => f.endsWith(".css"))
          .flatMap((f) => {
            const thing = bundle[f];
            if (thing.type === "asset" && typeof thing.source === "string") {
              return [{ file: f, raw: thing.source }];
            }
            return [];
          }),
      ];
      const safelist = [/^type-/];
      const results = await purge.purge({ content, css, safelist });
      // TODO: Since I'm using raw content (which don't have filenames) for
      // everything, I'm relying on PurgeCSS to return result chunks in the same
      // order as the input CSS chunks...
      for (const [i, obj] of Object.entries(css)) {
        const res = results[i];
        const thing = bundle[obj.file];
        if (thing.type === "asset") {
          thing.source = res.css;
        }
      }
    },
  };
}
