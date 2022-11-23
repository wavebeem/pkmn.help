import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "tachyons";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "./i18n";
import ScreenError from "./ScreenError";
import "./style.css";

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

function log(str: string) {
  const p = document.createElement("p");
  p.textContent = str;
  p.className = "mv2 mh3";
  document.querySelector("#app")?.appendChild(p);
}

log(`Screen orientation: ${screen.orientation.type}`);
log(`Resolution: ${screen.width}x${screen.height}`);

screen.orientation.onchange = () => {
  log(`Rotate? ${screen.orientation.type}`);
  log(`Resolution: ${screen.width}x${screen.height}`);
};
