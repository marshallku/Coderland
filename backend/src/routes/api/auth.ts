import { Router } from "express";
import passport from "passport";
import { asyncHandler } from "../../utils";
import AuthService from "../../services/auth";
import config from "../../config";

export default (app: Router) => {
  const route = Router();

  // 구글 로그인
  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  // 구글 로그인 콜백, 토큰 발급
  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    asyncHandler(async (req, res) => {
      const { user } = req;

      const authService = new AuthService();
      const [accessToken, refreshToken] = await authService.login(user);
      res.cookie("access-token", accessToken, {
        httpOnly: true,
        secure: true,
        signed: true,
        maxAge: config.COOKIE_MAX_AGE,
      });
      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: true,
        signed: true,
        maxAge: config.COOKIE_MAX_AGE,
      });
      res.redirect("/");
    })
  );

  app.use("/auth", route);
};
