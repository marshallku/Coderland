import { Application } from "express";

import db from "./db";
import express from "./express";
import error from "./error";
import webPush from "./web-push";

export default (app: Application) => {
  db();
  express(app);
  error(app);
  webPush();
};
