import { Request, Response, NextFunction } from "express";
import passport from "passport";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};
