/* eslint-disable no-console */
import { argv } from "process";
import { fetchImages } from "./fetch-images.js";
import { mergeData } from "./merge-data.js";
import { scrapePokeapi } from "./scrape-pokeapi.js";
import { optimizeImages } from "./optimize-images.js";

async function main(flags: string[]) {
  if (!flags.includes("fast")) {
    await scrapePokeapi();
  }
  await fetchImages();
  await optimizeImages();
  await mergeData();
}

main(argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});
