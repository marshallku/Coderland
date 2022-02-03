import { Router } from "express";
import passport from "passport";
import { asyncHandler } from "../../utils";
import { User } from "../../models";
import AuthService from "../../services/auth";
import config from "../../config";

export default (app: Router) => {
  const route = Router();

  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    asyncHandler(async (req, res) => {
      const { user } = req;

      const authService = new AuthService(User);
      const [accessToken, refreshToken] = await authService.login(user);
      res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        maxAge: config.COOKIE_MAX_AGE,
      });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: config.COOKIE_MAX_AGE,
      });
      res.status(200).json({ isOk: true });
    })
  );

  app.use("/auth", route);
};
