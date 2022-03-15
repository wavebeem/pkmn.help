import path from "path";
import fs from "fs";

export function readJSON(filename: string): any {
  try {
    const json = fs.readFileSync(path.resolve(__dirname, filename), "utf-8");
    return JSON.parse(json);
  } catch (err) {
    return undefined;
  }
}
