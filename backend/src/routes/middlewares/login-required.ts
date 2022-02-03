import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";
import { User } from "../../models/User";

function parseAuthorizationHeader(
  authorizationHeader: string | undefined,
  next: NextFunction
) {
  if (!authorizationHeader) {
    next(new Error("로그인이 필요합니다!"));
  }
  return authorizationHeader.split(" ");
}

export default (req: Request, res: Response, next: NextFunction) => {
  // const token = req.header("authorization")?.split(" ")[1];
  const [scheme, token] = parseAuthorizationHeader(
    req.header("authorization"),
    next
  );
  if (scheme !== "Bearer") {
    next(new Error("로그인이 필요합니다!"));
    return;
  }
  if (!token) {
    next(new Error("로그인이 필요합니다!"));
    return;
  }
  verifyToken(token, async (error, decoded) => {
    if (error) {
      next(new Error("로그인이 필요합니다!"));
      return;
    }
    const user = await User.findOrCreate(decoded);
    req.user = user;
    next();
  });
};
