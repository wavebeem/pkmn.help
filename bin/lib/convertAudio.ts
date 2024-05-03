/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const CRY_SRC = "public/cry";
const CRY_DEST = "public/cry";

async function convertTo(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    execFileSync("ffmpeg", [
      // Suppress output
      "-v",
      "quiet",
      // Don't ask questions
      "-y",
      // Input file
      "-i",
      src,
      // Output file
      dest,
    ]);
  }
}

export async function convertAudio() {
  for (const name of fs.readdirSync(CRY_SRC)) {
    if (!name.endsWith(".ogg")) {
      continue;
    }
    const baseName = path.basename(name, ".ogg");
    const fullName = path.join(CRY_SRC, name);
    const outputAac = path.join(CRY_DEST, `${baseName}.aac`);
    const outputM4a = path.join(CRY_DEST, `${baseName}.m4a`);
    console.log("Converting", name, "...");
    await Promise.all([
      convertTo(fullName, outputAac),
      convertTo(fullName, outputM4a),
    ]);
  }
}
