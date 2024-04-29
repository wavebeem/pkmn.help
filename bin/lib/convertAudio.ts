/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const CRY_SRC = "public/cry";
const CRY_DEST = "public/cry";

export async function convertAudio() {
  for (const name of fs.readdirSync(CRY_SRC)) {
    if (!name.endsWith(".ogg")) {
      continue;
    }
    const baseName = path.basename(name, ".ogg");
    const fullName = path.join(CRY_SRC, name);
    const outputName = path.join(CRY_DEST, `${baseName}.mp3`);
    if (!fs.existsSync(outputName)) {
      console.log("Converting", fullName, "...");
      execFileSync("ffmpeg", ["-v", "quiet", "-y", "-i", fullName, outputName]);
    }
  }
}
