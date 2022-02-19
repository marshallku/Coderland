import express from "express";
import loader from "./loader";
import { logger } from "./utils";
import passportInit from "./passport";
import config from "./config";

const app = express();

passportInit();
loader(app);

const { port } = config;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`Start App at ${port}`);
  });
}

export default app;
