import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  domain: process.env.DOMAIN,
  mongoHost: process.env.MONGO_HOST,
  mongoPort: process.env.MONGO_PORT,
  mongoDBName: process.env.MONGO_DBNAME,
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  jwtSecret: process.env.JWT_SECRET_KEY,
  perPage: 8,
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 7,
};
