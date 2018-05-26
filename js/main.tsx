import * as React from "react";
import { render } from "react-dom";
import * as SmoothScroll from "smoothscroll-polyfill";

import "../less/style.less";
import App from "./App";

SmoothScroll.polyfill();
render(<App />, document.body);
