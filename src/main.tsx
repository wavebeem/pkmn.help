import * as React from "react";
import * as ReactDOM from "react-dom";

import "tachyons/css/tachyons.css";
import "./style.css";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#app")
);
