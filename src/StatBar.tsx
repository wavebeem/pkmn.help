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
        style={{ maxWidth: "255px" }}
        className="flex h1 w-100 Bar-Container"
      >
        <div
          style={{
            width: (value / max) * 100 + "%",
            background: "var(--type-color-2)",
          }}
          className={`type-${type} Bar-Fill`}
        ></div>
      </div>
    </div>
  );
}

StatBar.displayName = "StatBar";
