import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../../models";

/**
 * 유저가 로그인한 상태인지 토큰을 통해 확인합니다.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, async (error, user) => {
    if (user) {
      req.user = await User.findByGoogleId({ googleId: user.googleId });
    }
    next();
  })(req, res, next);
};
