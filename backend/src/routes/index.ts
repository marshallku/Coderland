import { Router } from "express";
import auth from "./api/auth";
import user from "./api/user";
import post from "./api/post";
import home from "./api/home";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  post(app);
  home(app);
  return app;
};
