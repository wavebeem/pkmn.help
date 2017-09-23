import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import * as SmoothScroll from "smoothscroll-polyfill";

import * as store from "./store";
import * as App from "./app";

SmoothScroll.polyfill()

// window.Perf = require("react-addons-perf");
// console.log(window.Perf);

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("react-root")
  const component = <Provider store={store}><App /></Provider>;
  render(component, root)
}, false)
