import { Router } from "express";
import auth from "./api/auth";
import user from "./api/user";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  return app;
};
