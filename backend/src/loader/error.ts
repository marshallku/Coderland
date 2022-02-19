import { Request, Response, NextFunction, Application } from "express";
import { asyncHandler } from "../utils";

export default (app: Application) => {
  app.get(
    "/error",
    asyncHandler(async (req: Request, res: Response) => {
      throw new Error("에러가 발생했어요...");
      res.status(200).json({ isOk: true });
    })
  );

  app.use((req: Request, res: Response) => {
    res.status(404).json({ isOk: false, msg: "뭔가 잘못된 것 같아요..." });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(403).json({ isOk: false, msg: err.message });
    next();
  });
};
