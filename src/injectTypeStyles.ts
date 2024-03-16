const css = String.raw;

function injectCSS() {
  const style = document.createElement("style");
  style.dataset.source = import.meta.url;
  style.textContent = createCSS();
  document.head.append(style);
}

function createCSS() {
  return css`
    :root {
      --stellar-color-border: hsl(0 0% 10%);
    }

    :root[data-theme="dark"],
    :root[data-theme="auto"][data-theme-auto="dark"] {
      --stellar-color-border: hsl(220 20% 85%);
    }

    .type-stellar {
      background: ${createStellarGradientLinear()};
      border-color: var(--stellar-color-border);
    }

    .type-stellar-conic {
      background: ${createStellarGradientConic()};
      border-color: var(--stellar-color-border);
    }

    .type-stellar-dark {
      background: ${createStellarGradientDark()};
      border-color: var(--stellar-color-border);
    }

    .type-stellar-label {
      background: hsl(0 0% 30% / 70%);
    }
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

injectCSS();
