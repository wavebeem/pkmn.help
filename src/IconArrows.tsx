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

const paths = {
  Left: arrowPath({ offsetX: 0, flipH: false }),
  Right: arrowPath({ offsetX: 0, flipH: true }),
  LeftDouble: [
    arrowPath({ offsetX: -strokeWidth, flipH: false }),
    arrowPath({ offsetX: strokeWidth, flipH: false }),
  ].join("\n"),
  RightDouble: [
    arrowPath({ offsetX: -strokeWidth, flipH: true }),
    arrowPath({ offsetX: strokeWidth, flipH: true }),
  ].join("\n"),
} as const;

function createComponent(
  name: keyof typeof paths
): (props: React.SVGProps<SVGSVGElement>) => JSX.Element {
  const path = paths[name];
  function IconArrow(props: React.SVGProps<SVGSVGElement>): JSX.Element {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        fill="none"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        {...props}
      >
        <path d={path} />
      </svg>
    );
  }
  IconArrow.displayName = `IconArrow${name}`;
  return IconArrow;
}

export const IconArrowLeft = createComponent("Left");
export const IconArrowRight = createComponent("Right");
export const IconArrowLeftDouble = createComponent("LeftDouble");
export const IconArrowRightDouble = createComponent("RightDouble");
