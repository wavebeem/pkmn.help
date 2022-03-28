import * as React from "react";

const strokeWidth = 4;
const size = 24;
const paddingH = 8;
const paddingV = 4;

function flipXY(x: number, y: number, flip: boolean): [number, number] {
  if (flip) {
    return [size - x, y];
  }
  return [x, y];
}

function arrowPath({
  offsetX,
  flipH,
}: {
  offsetX: number;
  flipH: boolean;
}): string {
  const p1 = flipXY(size - paddingH + offsetX, paddingV, flipH);
  const p2 = flipXY(paddingH + offsetX, size / 2, flipH);
  const p3 = flipXY(size - paddingH + offsetX, size - paddingV, flipH);
  return ["M", p1, "L", p2, "L", p3].join(" ");
}

const arrowLeftPath = arrowPath({ offsetX: 0, flipH: false });
const arrowRightPath = arrowPath({ offsetX: 0, flipH: true });
const arrowLeftDoublePath = [
  arrowPath({ offsetX: -4, flipH: false }),
  arrowPath({ offsetX: 4, flipH: false }),
].join("\n");
const arrowRightDoublePath = [
  arrowPath({ offsetX: -4, flipH: true }),
  arrowPath({ offsetX: 4, flipH: true }),
].join("\n");

const svgProps: React.SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: `0 0 ${size} ${size}`,
  width: size,
  height: size,
  fill: "none",
  strokeWidth: strokeWidth,
  stroke: "currentColor",
};

export function IconArrowLeft(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg {...svgProps} {...props}>
      <path d={arrowLeftPath} />
    </svg>
  );
}

export function IconArrowRight(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg {...svgProps} {...props}>
      <path d={arrowRightPath} />
    </svg>
  );
}
export function IconArrowLeftDouble(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg {...svgProps} {...props}>
      <path d={arrowLeftDoublePath} />
    </svg>
  );
}

export function IconArrowRightDouble(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg {...svgProps} {...props}>
      <path d={arrowRightDoublePath} />
    </svg>
  );
}
