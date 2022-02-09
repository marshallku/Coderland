import { Request, Response, NextFunction } from "express";
import { decode, TokenExpiredError, verify, sign } from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";
import config from "../../config";
import { User } from "../../models";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, payload, info) => {
      if (error) {
        return next(error);
      }
      if (!payload) {
        // TODO: 액세스 토큰 만료 시 리프레시 토큰 확인하고, 리프레시 토큰에 따라 새 토큰 or 로그인 필요
        if (info instanceof TokenExpiredError) {
          const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
          const { googleId } = Object(decode(accessToken));

          const refreshTokenInRequest =
            ExtractJwt.fromHeader("refreshtoken")(req);
          try {
            verify(refreshTokenInRequest, config.jwtSecret);
          } catch (error) {
            return next(new Error("로그인이 필요합니다!"));
          }

          const { refreshToken } = await User.getRefreshTokenByGoogleId({
            googleId,
          });

          if (refreshToken === refreshTokenInRequest) {
            const newToken = sign({ googleId }, config.jwtSecret, {
              expiresIn: "7d",
            });
            res.cookie("accesstoken", newToken, {
              httpOnly: true,
              maxAge: config.COOKIE_MAX_AGE,
            });
            return next();
          }
        }

        return next(new Error("로그인이 필요합니다!"));
      }

      // 액세스 토큰 만료 안된 경우 통과
      req.user = await User.findByGoogleId({ googleId: payload.googleId });
      return next();
    }
  )(req, res, next);
};
