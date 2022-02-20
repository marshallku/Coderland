import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { tryLoginOnLoad } from "./hooks/auth";
import initializeSubscription from "./utils/pushNotification";
import "./css/reset.css";
import "./css/index.css";
import "./css/icon.css";

tryLoginOnLoad();
initializeSubscription();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
