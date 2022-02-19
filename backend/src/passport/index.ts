import passport from "passport";
import google from "./strategies/google";
import jwtStrategy from "./strategies/jwt";

export default () => {
  passport.use("jwt", jwtStrategy);
  passport.use("google", google);

  passport.initialize();
};
