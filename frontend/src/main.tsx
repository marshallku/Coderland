import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { tryLoginOnLoad } from "./hooks/auth";
import "./css/reset.css";
import "./css/index.css";
import "./css/icon.css";

tryLoginOnLoad();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
