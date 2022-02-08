import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../../models";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, async (error, user) => {
    if (user) {
      req.user = await User.findByGoogleId({ googleId: user.googleId });
    }
    next();
  })(req, res, next);
};
