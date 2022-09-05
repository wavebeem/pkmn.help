import * as React from "react";

export interface PercentBarProps {
  value: number;
  max: number;
}

export function PercentBar({ value, max }: PercentBarProps) {
  const percent = (value / max) * 100;
  return (
    <div className="flex h1 w-100 Bar-Container">
      <div
        style={{
          width: `${percent}%`,
          background: "var(--color-fg3)",
        }}
        className="Bar-Fill"
      ></div>
    </div>
  );
}
