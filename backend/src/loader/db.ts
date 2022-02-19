import mongoose from "mongoose";
import { logger } from "../utils";
import config from "../config";

export default () => {
  const { mongoHost, mongoPort, mongoDBName } = config;
  mongoose.connect(
    `mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`,
    (error) => {
      if (error) {
        logger.info(error);
      } else {
        logger.info(
          `DB connected at mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`
        );
      }
    }
  );
};
