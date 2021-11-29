import classNames from "classnames";
import * as React from "react";
import { Type } from "./data";
import { cssType } from "./cssType";

export interface StatBarProps {
  value: number;
  max: number;
  type: Type;
}

export default function StatBar({ value, max, type }: StatBarProps) {
  return (
    <div className="flex h1 w-100 Bar-Container">
      <div
        style={{
          width: (value / max) * 100 + "%",
          background: "var(--type-color2)",
        }}
        className={classNames(cssType(type), "Bar-Fill")}
      ></div>
    </div>
  );
}
