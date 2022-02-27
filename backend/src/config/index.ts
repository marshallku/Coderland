import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  domain: process.env.DOMAIN,

  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,

  jwtSecret: process.env.JWT_SECRET_KEY,

  perPage: 8,
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 7,

  NOTIFICATION_MAX_AGE: 1000 * 60 * 60 * 24 * 30,

  mongoHost: process.env.MONGO_HOST,
  mongoPort: process.env.MONGO_PORT,
  mongoDBName: process.env.MONGO_DBNAME,
  mongoUser: process.env.MONGO_USER,
  mongoPwd: process.env.MONGO_PASSWORD,
  tlsCertificateKeyFile: process.env.TLS_CERTIFICATE_KEY_FILE,
  tlsCAFile: process.env.TLS_CA_FILE,

  publicVapidKey: process.env.PUBLIC_VAPID_KEY,
  privateVapidKey: process.env.PRIVATE_VAPID_KEY,
};
