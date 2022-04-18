import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { tryLoginOnLoad } from "./hooks/auth";
import initializeSubscription from "./utils/pushNotification";
import "./css/reset.css";
import "./css/index.css";
import "./css/icon.css";

tryLoginOnLoad();
initializeSubscription();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
