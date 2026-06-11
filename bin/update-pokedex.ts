/* eslint-disable no-console */
import { argv } from "process";
import { downloadMedia } from "./lib/downloadMedia.js";
import { mergeData } from "./lib/mergeData.js";
import { scrapePokeapi } from "./lib/scrapePokeapi.js";
import { optimizeImages } from "./lib/optimizeImages.js";
import { convertAudio } from "./lib/convertAudio.js";
import { scrapeVersions } from "./lib/scrapeVersions.js";

async function main(flags: string[]) {
  if (flags.includes("versions")) {
    await scrapeVersions();
    return;
  }

  if (flags.includes("merge")) {
    await mergeData();
    return;
  }

  if (flags.includes("fast")) {
    await downloadMedia();
    await optimizeImages({ force: false });
    await mergeData();
    return;
  }

  if (flags.includes("optimize")) {
    await optimizeImages({ force: true });
    return;
  }

  if (flags.includes("images")) {
    await downloadMedia();
    await optimizeImages({ force: false });
    return;
  }

  if (flags.includes("new-images")) {
    await scrapePokeapi();
    await downloadMedia();
    await optimizeImages({ force: false });
    return;
  }

  if (flags.includes("audio")) {
    await convertAudio();
    return;
  }

  await scrapeVersions();
  await scrapePokeapi();
  await downloadMedia();
  await optimizeImages({ force: false });
  await convertAudio();
  await mergeData();
}

main(argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});
