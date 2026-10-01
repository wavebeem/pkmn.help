import { spawn } from "node:child_process";

// Runs a shell command, streaming its output, rejecting on a non-zero exit.
export function run(command: string): Promise<void> {
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
