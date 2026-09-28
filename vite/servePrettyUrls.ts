import { Plugin } from "vite";

// public/changelog/, public/licenses/, and public/credits/ are generated
// pretty-URL pages. Vite's dev server SPA fallback (needed so deep client-side
// routes load index.html on a hard refresh) runs before it checks whether a
// matching directory index.html exists, so it always shadows these. Rewrite the
// URL up front so the built-in static middleware finds the real file first. Not
// needed in production: Netlify serves real files before applying the SPA
// redirect rule.
export function servePrettyUrls(): Plugin {
  const prettyPaths = ["/changelog/", "/licenses/", "/credits/"];
  return {
    name: "serve-generated-pretty-urls",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0];
        if (url && prettyPaths.includes(url)) {
          req.url = url + "index.html";
        }
        next();
      });
    },
  };
}
