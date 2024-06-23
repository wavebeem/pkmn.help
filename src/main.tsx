import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "./misc/i18n";
import "./debug";

const element = document.querySelector("#app");
if (!element) {
  throw new Error("No #app element found");
}

const root = createRoot(element);
root.render(<App />);
