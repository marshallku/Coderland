import mongoose from "mongoose";
import { logger } from "../utils";
import config from "../config";

export default () => {
  const {
    mongoHost,
    mongoPort,
    mongoDBName,
    mongoUser,
    mongoPwd,
    tlsCertificateKeyFile,
    tlsCAFile,
  } = config;

  const connectionUri =
    process.env.NODE_ENV === "production"
      ? `mongodb://${mongoUser}:${mongoPwd}@${mongoHost}:${mongoPort}/${mongoDBName}`
      : `mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`;
  const option =
    process.env.NODE_ENV === "production"
      ? {
          tls: true,
          tlsCertificateKeyFile: `${__dirname}/${tlsCertificateKeyFile}`,
          tlsCAFile: `${__dirname}/${tlsCAFile}`,
          tlsAllowInvalidHostnames: true,
        }
      : {};

  mongoose
    .connect(connectionUri, option)
    .then(() => {
      logger.info(
        `DB connected at mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`
      );
    })
    .catch((error) => {
      logger.info(error);
    });
};
