import { publicPath } from "./settings";

export type Gender = "default" | "female";

function getImage({
  id,
  shiny,
  size,
  gender,
  fileType,
}: {
  id: string;
  shiny: boolean;
  size: 256 | 512;
  gender: Gender;
  fileType: "webp" | "png";
}): string {
  const dir = `img/${size}`;
  let filename = String(id);
  if (shiny) {
    filename += "-shiny";
  }
  if (gender === "female") {
    filename += "-female";
  }
  return new URL(`${dir}/${filename}.${fileType}`, publicPath).href;
}

export function getWebpSrcSet({
  id,
  shiny,
  gender,
}: {
  id: string;
  shiny: boolean;
  gender: Gender;
}): string {
  const webp256 = getImage({ id, shiny, size: 256, gender, fileType: "webp" });
  const webp512 = getImage({ id, shiny, size: 512, gender, fileType: "webp" });
  return `${webp256} 1x, ${webp512} 2x`;
}

export function getPngSrc({
  id,
  shiny,
  gender,
}: {
  id: string;
  shiny: boolean;
  gender: Gender;
}): string {
  return getImage({ id, shiny, size: 256, gender, fileType: "png" });
}
