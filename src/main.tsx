import React from "react";
import { render } from "react-dom";
import SmoothScroll from "smoothscroll-polyfill";

import "../less/style.less";
import App from "./App";

SmoothScroll.polyfill();
render(<App />, document.querySelector("#app"));
