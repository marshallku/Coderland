import express, { Application } from "express";
import cors from "cors";
import route from "../routes";

export default (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api", route());
};
