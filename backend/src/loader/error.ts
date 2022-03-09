import { Request, Response, NextFunction, Application } from "express";

export default (app: Application) => {
  app.use((req: Request, res: Response) => {
    res.status(404).json({ isOk: false, msg: "페이지를 찾을 수 없습니다." });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(403).json({ isOk: false, msg: err.message });
    next();
  });
};
