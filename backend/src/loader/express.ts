import express, { Request, Response, Application } from "express";
import cors from "cors";
import route from "../routes";

export default (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ isOk: true });
  });

  app.use("/api", route());
};
