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
    <div className="flex justify-end">
      <div
        style={{
          maxWidth: "255px",
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
          background: "rgba(0, 0, 0, 0.025)",
        }}
        className="flex h1 w-100"
      >
        <div
          style={{
            width: (value / max) * 100 + "%",
            background: "var(--type-color-2)",
            boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.2)",
          }}
          className={`type-${type}`}
        ></div>
      </div>
    </div>
  );
}

StatBar.displayName = "StatBar";
