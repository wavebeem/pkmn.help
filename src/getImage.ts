const req = (require as any).context("../img", false, /\.png$/);

export default function getImage(id: string): string {
  return req(`./${id}.png`);
}
