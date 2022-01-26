import { Router } from "express";
import auth from "./api/auth";

export default () => {
  const app = Router();
  auth(app);
  return app;
};
