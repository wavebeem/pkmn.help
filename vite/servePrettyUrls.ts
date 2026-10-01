import { Plugin } from "vite";

// Lets generated pages like public/404/index.html load as /404/ in dev.
export function servePrettyUrls(): Plugin {
  return {
    name: "serve-generated-pretty-urls",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const { pathname } = new URL(req.url ?? "", "http://test.example");
        if (pathname.endsWith("/")) {
          req.url = pathname + "index.html";
        }
        next();
      });
    },
  };
}
