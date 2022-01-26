import { Router } from "express";
import passport from "passport";
import { createToken } from "../../passport/strategies/jwt";

export default (app: Router) => {
  const route = Router();

  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      const { user } = req;
      res.status(200).cookie("token", createToken(user)).json({ isOk: true });
    }
  );

  app.use("/auth", route);
};
