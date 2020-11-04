import * as React from "react";

export interface PercentBarProps {
  value: number;
  max: number;
}

export function PercentBar(props: PercentBarProps) {
  const { value, max } = props;
  return (
    <div
      style={{
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
        background: "rgba(0, 0, 0, 0.025)",
      }}
      className="flex h1 w-100"
    >
      <div
        style={{
          width: (value / max) * 100 + "%",
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.2)",
        }}
        className="bg-gray"
      ></div>
    </div>
  );
}

PercentBar.displayName = "PercentBar";
