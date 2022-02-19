import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";
import { User } from "../../models/User";
import configs from "../../config";

const { clientID, clientSecret, domain } = configs;

const opts: StrategyOptions = {
  clientID,
  clientSecret,
  callbackURL: `${domain}/api/auth/google/callback`,
};

// 구글 로그인
export default new GoogleStrategy(
  opts,
  async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, name, photos, provider } = profile;
    if (provider !== "google") {
      done("잘못된 접근이에요...");
    }
    const user = await User.findOrCreate(
      { googleId: id },
      { displayName, name, photos }
    );
    done(null, user);
  }
);
