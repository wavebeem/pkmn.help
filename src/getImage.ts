const req = (() => {
  if (process.env.NODE_ENV !== "test") {
    return (require as any).context("../img", false, /\.png$/);
  }
  return (x: any) => x;
})();

export default function getImage(id: string): string {
  return req(`./${id}.png`);
}
