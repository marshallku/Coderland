import { Request } from "express";

export function accessTokenExtractor(req: Request): string {
  let accessToken = null;
  if (req?.signedCookies) {
    accessToken = req.signedCookies["access-token"];
  }
  return accessToken;
}

export function refreshTokenExtractor(req: Request): string {
  let refreshToken = null;
  if (req?.signedCookies) {
    refreshToken = req.signedCookies["refresh-token"];
  }
  return refreshToken;
}
