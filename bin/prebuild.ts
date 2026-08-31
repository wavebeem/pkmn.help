// Runs everything that needs to happen before `vite build`: clear out the old
// dist folder, run the test suite, and regenerate the build-time files that
// live under public/ but aren't checked into git.
//
// Run: npm run prebuild
//
import { spawn } from "node:child_process";

function run(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { stdio: "inherit", shell: true });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

await run("rimraf dist");
await run("npm test");
await run("npm run generate-licenses");
await run("npm run generate-changelog");
await run("npm run generate-credits");
