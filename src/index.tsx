import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
