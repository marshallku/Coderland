import webpush from "web-push";
import config from "../config";

export default () => {
  const { publicVapidKey, privateVapidKey } = config;

  webpush.setVapidDetails(
    "mailto:none@none.com",
    publicVapidKey,
    privateVapidKey
  );
};
