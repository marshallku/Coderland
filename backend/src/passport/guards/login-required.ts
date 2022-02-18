import { Request, Response, NextFunction } from "express";
import { decode, TokenExpiredError, verify, sign } from "jsonwebtoken";
import passport from "passport";
import config from "../../config";
import { User } from "../../models";
import { accessTokenExtractor, refreshTokenExtractor } from "../../utils";

/**
 * 로그인이 필요한 서비스에서 토큰을 검증해
 * 로그인한 유저인지 확인합니다.
 *
 * 액세스 토큰이 만료된 경우
 * 리프레시 토큰을 조회해 확인 후,
 * 액세스 토큰 재발급 혹은 다시 구글 로그인으로 안내합니다.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, payload, info) => {
      if (error) {
        return next(error);
      }
      if (!payload) {
        // 액세스 토큰이 만료된 경우
        if (info instanceof TokenExpiredError) {
          const accessToken = accessTokenExtractor(req);
          const { googleId } = Object(decode(accessToken));

          // 유저가 가지고 있는 리프레시 토큰 확인 만료 시 로그인 필요
          const refreshTokenInRequest = refreshTokenExtractor(req);
          try {
            verify(refreshTokenInRequest, config.jwtSecret);
          } catch (error) {
            return next(new Error("로그인이 필요합니다!"));
          }

          // DB의 유저 정보에 저장된 리프레시 토큰 조회
          const { refreshToken } = await User.getRefreshTokenByGoogleId({
            googleId,
          });

          // 리프레시 토큰 비교 후 액세스 토큰 재발급
          if (refreshToken === refreshTokenInRequest) {
            const newToken = sign({ googleId }, config.jwtSecret, {
              expiresIn: "7d",
            });
            res.cookie("access-token", newToken, {
              httpOnly: true,
              secure: true,
              signed: true,
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
