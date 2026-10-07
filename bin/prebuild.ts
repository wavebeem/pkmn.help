// Runs everything that needs to happen before `vite build`: clear out the old
// dist folder, run the test suite, and regenerate the build-time files that
// live under public/ but aren't checked into git.
//
// Run: npm run prebuild
//
import { rm } from "node:fs/promises";
import { run } from "./lib/run.js";

await rm("dist", { recursive: true, force: true });
await run("npm test");
await run("npm run generate-static");
await run("npm run generate-netlify");
