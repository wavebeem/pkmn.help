import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "tachyons";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import ScreenError from "./ScreenError";
import "./style.css";
import { Type } from "./data";

export function cssType(type: Type): string {
  switch (type) {
    case Type.FIRE:
      return "type-fire";
    case Type.WATER:
      return "type-water";
    case Type.GRASS:
      return "type-grass";
    case Type.ELECTRIC:
      return "type-electric";
    case Type.PSYCHIC:
      return "type-psychic";
    case Type.ICE:
      return "type-ice";
    case Type.DRAGON:
      return "type-dragon";
    case Type.DARK:
      return "type-dark";
    case Type.FAIRY:
      return "type-fairy";
    case Type.NORMAL:
      return "type-normal";
    case Type.FIGHTING:
      return "type-fighting";
    case Type.FLYING:
      return "type-flying";
    case Type.POISON:
      return "type-poison";
    case Type.GROUND:
      return "type-ground";
    case Type.ROCK:
      return "type-rock";
    case Type.BUG:
      return "type-bug";
    case Type.GHOST:
      return "type-ghost";
    case Type.STEEL:
      return "type-steel";
    case Type.NONE:
      return "type-none";
    default:
      throw new Error(`unknown type ${type}`);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary render={(error) => <ScreenError error={error} />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.querySelector("#app")
);
