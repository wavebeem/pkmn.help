import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "tachyons";
import { App } from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import "./i18n";
import { ScreenError } from "./ScreenError";
import "./style.css";

const root = document.querySelector("#app");
if (!root) {
  throw new Error("Couldn't find #app");
}
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary render={(error) => <ScreenError error={error} />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
