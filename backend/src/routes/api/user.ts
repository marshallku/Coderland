import { Router } from "express";
import asyncHandler from "../../utils/async-handler";
import loginRequired from "../middlewares/login-required";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      res.status(200).json({ isOk: true, user });
    })
  );

  app.use("/users", route);
};
