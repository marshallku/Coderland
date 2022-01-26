import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";
import { User } from "../../models/User";
import configs from "../../config/configs";

const { clientID, clientSecret, port } = configs;

const opts: StrategyOptions = {
  clientID,
  clientSecret,
  callbackURL: `http://localhost:${port}/api/auth/google/callback`,
};

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
