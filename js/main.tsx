import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import * as SmoothScroll from "smoothscroll-polyfill";

import store from "./store";
import App from "./App";

// window.Perf = require("react-addons-perf");
// console.log(window.Perf);

function main() {
  const root = document.getElementById("react-root");
  const component = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  render(component, root);
}

SmoothScroll.polyfill();
window.addEventListener("DOMContentLoaded", main, false);
