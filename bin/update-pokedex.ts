/* eslint-disable no-console */
import { argv } from "process";
import { downloadMedia } from "./lib/downloadMedia.js";
import { mergeData } from "./lib/mergeData.js";
import { scrapePokeapi } from "./lib/scrapePokeapi.js";
import { optimizeImages } from "./lib/optimizeImages.js";

async function main(flags: string[]) {
  if (flags.includes("merge")) {
    await mergeData();
    return;
  }

  if (flags.includes("fast")) {
    await downloadMedia();
    await optimizeImages();
    await mergeData();
    return;
  }

  if (flags.includes("optimize")) {
    await optimizeImages();
    return;
  }

  if (flags.includes("test")) {
    await scrapePokeapi();
    await downloadMedia();
    await mergeData();
    return;
  }

  await scrapePokeapi();
  await downloadMedia();
  await optimizeImages();
  await mergeData();
}

main(argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});
