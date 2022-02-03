import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI,
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  jwtSecret: process.env.JWT_SECRET_KEY,
  perPage: 10,
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 7,
};
