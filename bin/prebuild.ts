// Runs everything that needs to happen before `vite build`: clear out the old
// dist folder, run the test suite, and regenerate the build-time files that
// live under public/ but aren't checked into git.
//
// Run: npm run prebuild
//
import { run } from "./lib/run.js";

await run("rimraf dist");
await run("npm test");
await run("npm run generate-static");
