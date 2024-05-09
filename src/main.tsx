import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./misc/i18n";
import { ScreenError } from "./screens/ScreenError";

const element = document.querySelector("#app");
if (!element) {
  throw new Error("No #app element found");
}

const root = createRoot(element);

root.render(
  <ErrorBoundary render={(error) => <ScreenError error={error} />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
