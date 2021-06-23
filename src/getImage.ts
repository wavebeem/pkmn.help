export function getImage(id: string): string {
  return `${process.env.PUBLIC_PATH}img/${id}.png`;
}
