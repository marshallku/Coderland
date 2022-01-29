import { Router } from "express";
import auth from "./api/auth";
import user from "./api/user";
import post from "./api/post";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  post(app);
  return app;
};
