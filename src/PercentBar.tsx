import * as React from "react";

export interface PercentBarProps {
  value: number;
  max: number;
}

export function PercentBar({ value, max }: PercentBarProps) {
  return (
    <div className="flex h1 w-100 Bar-Container">
      <div
        style={{
          width: (value / max) * 100 + "%",
          background: "var(--color-fg3)",
        }}
        className="Bar-Fill"
      ></div>
    </div>
  );
}

