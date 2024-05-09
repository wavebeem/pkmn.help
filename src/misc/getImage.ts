import { publicPath } from "./settings";

function getImage({
  id,
  shiny,
  size,
  fileType,
}: {
  id: string;
  shiny: boolean;
  size: 256 | 512;
  fileType: "webp" | "png";
}): string {
  const dir = `img/${size}`;
  const filename = shiny ? `${id}-shiny` : id;
  return new URL(`${dir}/${filename}.${fileType}`, publicPath).href;
}

export function getWebpSrcSet({
  id,
  shiny,
}: {
  id: string;
  shiny: boolean;
}): string {
  const webp256 = getImage({ id, shiny, size: 256, fileType: "webp" });
  const webp512 = getImage({ id, shiny, size: 512, fileType: "webp" });
  return `${webp256} 1x, ${webp512} 2x`;
}

export function getPngSrc({
  id,
  shiny,
}: {
  id: string;
  shiny: boolean;
}): string {
  return getImage({ id, shiny, size: 256, fileType: "png" });
}
