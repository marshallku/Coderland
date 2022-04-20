import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import initializeSubscription from "./utils/pushNotification";
import { useAuthStore } from "./store";
import "./css/reset.css";
import "./css/index.css";
import "./css/icon.css";

useAuthStore.getState().initialize();
initializeSubscription();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
