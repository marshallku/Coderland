import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  if (user.grade < 1) {
    return next(new Error("레이서 인증이 필요합니다!"));
  }
  return next();
};
