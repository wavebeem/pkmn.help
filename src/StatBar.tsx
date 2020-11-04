import * as React from "react";
import { Type } from "./data";

export interface StatBarProps {
  value: number;
  max: number;
  type: Type;
}

export default function StatBar(props: StatBarProps) {
  const { value, max, type } = props;
  return (
    <div
      style={{
        height: "1em",
        width: "100%",
        maxWidth: "255px",
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
        background: "rgba(0, 0, 0, 0.025)",
      }}
      className="flex"
    >
      <div
        style={{
          width: (value / max) * 100 + "%",
          background: "var(--type-color-2)",
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.3)",
        }}
        className={`type-${type}`}
      ></div>
    </div>
  );
}

StatBar.displayName = "StatBar";
