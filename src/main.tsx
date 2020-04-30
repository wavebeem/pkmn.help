import * as React from "react";
import * as ReactDOM from "react-dom";
import SmoothScroll from "smoothscroll-polyfill";

import "tachyons/css/tachyons.css";
import "./style.css";
import { App } from "./App";

SmoothScroll.polyfill();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#app")
);
