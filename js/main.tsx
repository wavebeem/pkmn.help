import * as React from "react";
import { render } from "react-dom";
import * as SmoothScroll from "smoothscroll-polyfill";

import App from "./App";

// window.Perf = require("react-addons-perf");
// console.log(window.Perf);

function main() {
  const root = document.getElementById("react-root");
  render(<App />, root);
}

SmoothScroll.polyfill();
window.addEventListener("DOMContentLoaded", main, false);
