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
        height: "1em",
        width: "100%",
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
        background: "rgba(0, 0, 0, 0.025)",
      }}
      className="flex"
    >
      <div
        style={{
          width: (value / max) * 100 + "%",
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.3)",
        }}
        className="bg-gray"
      ></div>
    </div>
  );
}

PercentBar.displayName = "PercentBar";
