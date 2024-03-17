const css = String.raw;

function createCSS() {
  return css`
    --stellar-background-linear: ${createStellarGradientLinear()};
    --stellar-background-conic: ${createStellarGradientConic()};
    --stellar-background-dark: ${createStellarGradientDark()};
  `;
}

function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

function createStellarGradientLinear() {
  const count = 16;
  const steps: string[] = [];
  const fudge = "1px";
  for (const i of range(1, count)) {
    const j = i - 1;
    const p1 = j === 0 ? "0" : `calc(${j * (100 / count)}% - ${fudge})`;
    const p2 = `calc(${i * (100 / count)}% + ${fudge})`;
    const hue = j * (360 / count);
    const color = hsl(hue, 100, 50);
    steps.push([color, p1, p2].join(" "));
  }
  return `linear-gradient(-225deg, ${steps.join(", ")})`;
}

function createStellarGradientDark() {
  const count = 16;
  const steps: string[] = [];
  const fudge = "1px";
  for (const i of range(1, count)) {
    const j = i - 1;
    const p1 = j === 0 ? "0" : `calc(${j * (100 / count)}% - ${fudge})`;
    const p2 = `calc(${i * (100 / count)}% + ${fudge})`;
    const hue = j * (360 / count);
    const color = hsl(hue, 100, 20);
    steps.push([color, p1, p2].join(" "));
  }
  return `linear-gradient(-225deg, ${steps.join(", ")})`;
}

function createStellarGradientConic() {
  const count = 16;
  const steps: string[] = [];
  for (const i of range(1, count)) {
    const j = i - 1;
    const angle2 = i * (360 / count) - 4 + "deg";
    const angle1 = j * (360 / count) + "deg";
    const hue = j * (360 / count);
    const color = hsl(hue, 100, 50);
    steps.push([color, angle1, angle2].join(" "));
  }
  return `conic-gradient(${steps.join(", ")})`;
}

console.log(createCSS());
