import * as React from "react";
import { render } from "react-dom";
import SmoothScroll from "smoothscroll-polyfill";

import "tachyons/css/tachyons.css";
import "./style.css";
import { App } from "./App";

SmoothScroll.polyfill();
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#app")
);
