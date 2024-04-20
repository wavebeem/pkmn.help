import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import "./i18n";
import { ScreenError } from "./ScreenError";

const element = document.querySelector("#app");
if (!element) {
  throw new Error("No #app element found");
}

const root = ReactDOM.createRoot(element);

root.render(
  <ErrorBoundary render={(error) => <ScreenError error={error} />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
