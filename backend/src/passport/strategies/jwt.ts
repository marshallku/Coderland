import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-jwt";
import config from "../../config";

const jwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const jwtVerify: VerifyCallback = (payload, done) => {
  if (!payload) {
    return done(null, payload, "로그인이 필요합니다.");
  }
  return done(null, payload);
};

export default new Strategy(jwtOpts, jwtVerify);
