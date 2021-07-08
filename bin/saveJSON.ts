import path from "path";
import fs from "fs";

export function saveJSON(filename: string, data: any): void {
  fs.writeFileSync(
    path.resolve(__dirname, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
